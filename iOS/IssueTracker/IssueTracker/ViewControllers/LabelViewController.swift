//
//  LabelViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/12.
//

import UIKit

protocol LabelCoordinatorDelegate: AnyObject {
    func willRequestLabels()
    func presentAddLabel()
    func presentEditLabel(label: Label)
}

class LabelViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    private weak var delegate: LabelCoordinatorDelegate?
    private var labels: Labels? {
        didSet {
            applySnapshot()
        }
    }
    private var dataSource: UICollectionViewDiffableDataSource<Int, Label>! = nil
    
    init?(coder: NSCoder, delegate: LabelCoordinatorDelegate) {
        self.delegate = delegate
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configRightItem()
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
        delegate?.willRequestLabels()
        configureDataSource()
    }
    
    func didResponseLabels(_ labels: Labels) {
        self.labels = labels
    }
}

extension LabelViewController {
    func configRightItem() {
        let barButtonItem = UIBarButtonItem(systemItem: .add)
        barButtonItem.target = self
        barButtonItem.action = #selector(didAddButtonTapped)
        navigationItem.rightBarButtonItem = barButtonItem
    }
    
    @objc func didAddButtonTapped(_ sender: UIBarButtonItem) {
        delegate?.presentAddLabel()
    }
}
extension LabelViewController {
    func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    func configureDataSource() {
        dataSource = UICollectionViewDiffableDataSource<Int, Label>(
            collectionView: collectionView
        ) { collectionView, indexPath, identifier in
            guard let cell = collectionView
                    .dequeueReusableCell(withReuseIdentifier: "LabelCollectionViewCell", for: indexPath)
                    as? LabelCollectionViewCell
            else { return nil }
            
            cell.configure(label: identifier)
            return cell
        }
        
        applySnapshot()
    }
    
    private func applySnapshot() {
        guard let labels = labels?.labels else { return }
        var snapshot = NSDiffableDataSourceSnapshot<Int, Label>()
        snapshot.appendSections([0])
        snapshot.appendItems(labels)
        dataSource.apply(snapshot, animatingDifferences: false)
    }
}

extension LabelViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let label = labels?.labels[indexPath.item] else { return }
        delegate?.presentEditLabel(label: label)
    }
}
