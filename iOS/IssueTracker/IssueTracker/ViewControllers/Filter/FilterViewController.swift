//
//  FilterViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import UIKit

class FilterViewController: UIViewController {
    typealias Section = Filter.Category
    struct Item: Hashable {
        var filter: Filter
        
        init(filter: Filter) {
            self.filter = filter
        }
        
        static func == (lhs: Item, rhs: Item) -> Bool {
            return lhs.filter == rhs.filter
        }
    }
    
    @IBOutlet private weak var collectionView: UICollectionView!
    private var dataSource: UICollectionViewDiffableDataSource<Section, Item>!
    private let sectionHeaderElementKind = "section-header-element-kind"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureHierarchy()
        configureDataSource()
        applyInitialSnapshots()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        // 뭔가 코디네이터를 지원해주는 느낌인데??
//        if let indexPath = self.collectionView.indexPathsForSelectedItems?.first {
//            if let coordinator = self.transitionCoordinator {
//                coordinator.animate(alongsideTransition: { context in
//                    self.collectionView.deselectItem(at: indexPath, animated: true)
//                }) { (context) in
//                    if context.isCancelled {
//                        self.collectionView.selectItem(at: indexPath, animated: false, scrollPosition: [])
//                    }
//                }
//            } else {
//                self.collectionView.deselectItem(at: indexPath, animated: animated)
//            }
//        }
    }
    
    @IBAction func touchedCancelButton(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func touchedDoneButton(_ sender: Any) {
        print(dataSource.snapshot().itemIdentifiers.filter({ item -> Bool in
            if item.filter.category == .condition && item.filter.checkable { return true }
            return false
        }))
    }
}

extension FilterViewController {
    func configureHierarchy() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .systemGroupedBackground
        collectionView.delegate = self
    }
    
    func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .insetGrouped)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    /// - Tag: ValueCellConfiguration
    func configureDataSource() {
        // list cell
        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Filter> { (cell, indexPath, filter) in
            var contentConfiguration = UIListContentConfiguration.valueCell()
            contentConfiguration.text = filter.text
            cell.contentConfiguration = contentConfiguration
            
            switch filter.category {
            case .condition:
                if filter.checkable {
                    cell.accessories = [.checkmark()]
                } else {
                    cell.accessories = []
                }
            case .detail:
                cell.accessories = [.disclosureIndicator()]
            }
        }
        
        // data source
        dataSource = UICollectionViewDiffableDataSource<Section, Item>(collectionView: collectionView) {
            (collectionView, indexPath, item) -> UICollectionViewCell? in
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: item.filter)
        }
    }
    
    func applyInitialSnapshots() {
        for category in Filter.Category.allCases {
            var sectionSnapshot = NSDiffableDataSourceSectionSnapshot<Item>()
            let items = category.filters.map { Item(filter: $0) }
            sectionSnapshot.append(items)
            dataSource.apply(sectionSnapshot, to: category, animatingDifferences: false)
        }
    }
}

extension FilterViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let data = self.dataSource.itemIdentifier(for: indexPath) else {
            collectionView.deselectItem(at: indexPath, animated: true)
            return
        }
        
        var newData = data
        newData.filter.checkable = !newData.filter.checkable
        
        var newSnapshot = dataSource.snapshot()
        newSnapshot.insertItems([newData], beforeItem: data)
        newSnapshot.deleteItems([data])
        dataSource.apply(newSnapshot)
        
        //        let detailViewController = EmojiDetailViewController(with: emoji)
        //        self.navigationController?.pushViewController(detailViewController, animated: true)
    }
}

