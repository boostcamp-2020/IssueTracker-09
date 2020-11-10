//
//  IssueEditViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import UIKit

enum EditKey {
    case assignee, label, milestone
}

class IssueEditViewController: UIViewController {
    @IBOutlet private weak var collectionView: UICollectionView!
    
    private enum Section {
        case Edit
    }
    private var key: EditKey?
    private var issueEditController: IssueEditController?
    private var dataSource: UICollectionViewDiffableDataSource<Section, EditItem>!
    
    init?(coder: NSCoder, key: EditKey, data: Data) {
        self.key = key
        self.issueEditController = IssueEditController(key: key, data: data)
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureHierarchy()
        configureDataSource()
        applyInitialSnapshots()
    }
}

extension IssueEditViewController {
    private func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .insetGrouped)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    private func configureHierarchy() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .systemGroupedBackground
        collectionView.delegate = self
    }
    
    private func configureDataSource() {
        // list cell
        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, EditItem> { (cell, indexPath, item) in
            var contentConfiguration = UIListContentConfiguration.valueCell()
            contentConfiguration.text = item.content
            cell.contentConfiguration = contentConfiguration
            
            if item.checkable {
                cell.accessories = [.checkmark()]
            } else {
                cell.accessories = []
            }
        }
        
        // data source
        dataSource = UICollectionViewDiffableDataSource<Section, EditItem>(collectionView: collectionView) {
            (collectionView, indexPath, item) -> UICollectionViewCell? in
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: item)
        }
    }
    
    private func applyInitialSnapshots() {
        guard let items = issueEditController?.items else { return }
        var sectionSnapshot = NSDiffableDataSourceSectionSnapshot<EditItem>()
        sectionSnapshot.append(items)
        dataSource.apply(sectionSnapshot, to: Section.Edit, animatingDifferences: false)
    }
}


extension IssueEditViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let data = self.dataSource.itemIdentifier(for: indexPath) else {
            collectionView.deselectItem(at: indexPath, animated: true)
            return
        }
        
        var newSnapshot = dataSource.snapshot()
        var newData = data
        newData.checkable = !data.checkable
        newSnapshot.insertItems([newData], beforeItem: data)
        newSnapshot.deleteItems([data])
        dataSource.apply(newSnapshot)
    }
}

