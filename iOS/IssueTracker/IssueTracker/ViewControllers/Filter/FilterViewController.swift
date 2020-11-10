//
//  FilterViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import UIKit

protocol MoveToSearchPage: AnyObject {
    func move(to type: SearchType)
}

class FilterViewController: UIViewController {
    typealias Section = Filter.Category
    private struct Item: Hashable {
        var filter: Filter
        
        init(filter: Filter) {
            self.filter = filter
        }
        
        static func == (lhs: Item, rhs: Item) -> Bool {
            return lhs.filter == rhs.filter
        }
    }
    
    @IBOutlet private weak var collectionView: UICollectionView!
    private weak var delegate: MoveToSearchPage?
    private var dataSource: UICollectionViewDiffableDataSource<Section, Item>!
    private let sectionHeaderElementKind = "section-header-element-kind"
    
    init?(coder: NSCoder, delegate: MoveToSearchPage) {
        self.delegate = delegate
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
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
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
    private func configureHierarchy() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        collectionView.backgroundColor = .systemGroupedBackground
        collectionView.delegate = self
    }
    
    private func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .insetGrouped)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    private func configureDataSource() {
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
    
    private func applyInitialSnapshots() {
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
        
        if data.filter.category == .condition {
            var newSnapshot = dataSource.snapshot()
            let checkedFilter = newSnapshot.itemIdentifiers.filter { $0.filter.checkable }
            
            // 이미 체크된 항목이 있을 경우
            if data.filter.checkable == false, checkedFilter.count > 0 {
                checkedFilter.forEach { data in
                    var newData = data
                    newData.filter.checkable = false
                    
                    newSnapshot.insertItems([newData], beforeItem: data)
                    newSnapshot.deleteItems([data])
                }
            }
            
            var newData = data
            newData.filter.checkable = !data.filter.checkable
            newSnapshot.insertItems([newData], beforeItem: data)
            newSnapshot.deleteItems([data])
            dataSource.apply(newSnapshot)
            
        } else if data.filter.category == .detail {
            collectionView.deselectItem(at: indexPath, animated: true)
            guard let type = data.filter.type else {
                return
            }
            delegate?.move(to: type)
        }
    }
}

