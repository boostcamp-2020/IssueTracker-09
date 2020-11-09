//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/04.
//

import UIKit

class IssueDetailViewController: UIViewController {
    private enum Section {
        case content, comment
    }
    
    @IBOutlet weak var collectionView: UICollectionView!
    private var delegate: IssueEditServiceDelegate?
    private var service: IssueEditService?
    private var dataSource: UICollectionViewDiffableDataSource<Section, Issue>!
    
    init?(coder: NSCoder, service: IssueEditService, delegate: IssueEditServiceDelegate) {
        self.service = service
        self.delegate = delegate
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        collectionView.collectionViewLayout = createLayout()
        addBottomSheetView()
    }
}

extension IssueDetailViewController {
    func addBottomSheetView() {
        guard let bottomSheetVC = UIStoryboard(name: "IssueBottomSheet", bundle: nil).instantiateInitialViewController() as? IssueBottomSheetViewController
        else { return }

        self.addChild(bottomSheetVC)
        self.view.addSubview(bottomSheetVC.view)
        bottomSheetVC.didMove(toParent: self)

        let height = view.frame.height
        let width  = view.frame.width
        bottomSheetVC.view.frame = CGRect(x: 0, y: self.view.frame.maxY, width: width, height: height)
    }
}

extension IssueDetailViewController {
    func configureHierarchy() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
    }
    
    func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .grouped)
        configuration.showsSeparators = false
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
//    func configureDataSource() {
//        // list cell
//        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Issue> { (cell, indexPath, issue) in
//            switch filter.category {
//            case .condition:
//                if filter.checkable {
//                    cell.accessories = [.checkmark()]
//                } else {
//                    cell.accessories = []
//                }
//            case .detail:
//                cell.accessories = [.disclosureIndicator()]
//            }
//        }
//        
//        // data source
//        dataSource = UICollectionViewDiffableDataSource<Section, Item>(collectionView: collectionView) {
//            (collectionView, indexPath, item) -> UICollectionViewCell? in
//            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: item.filter)
//        }
//    }
//    
//    func applyInitialSnapshots() {
//        for category in Filter.Category.allCases {
//            var sectionSnapshot = NSDiffableDataSourceSectionSnapshot<Item>()
//            let items = category.filters.map { Item(filter: $0) }
//            sectionSnapshot.append(items)
//            dataSource.apply(sectionSnapshot, to: category, animatingDifferences: false)
//        }
//    }
}

extension IssueDetailViewController: UICollectionViewDelegate {
    
}

extension IssueDetailViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        2
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        switch section {
        case 0:
            return 1
        default:
            return 3
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        switch indexPath.section {
        case 0:
            return collectionView.dequeueReusableCell(withReuseIdentifier: "contentCell", for: indexPath)
        default:
            return collectionView.dequeueReusableCell(withReuseIdentifier: "commentCell", for: indexPath)
        }
    }
}
