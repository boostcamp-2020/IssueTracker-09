//
//  FilterSearchViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/03.
//

import UIKit

protocol SearchViewControllerDelegate: AnyObject {
    func back()
    func done()
}

class FilterSearchViewController: UIViewController {
    @IBOutlet private weak var searchBar: UISearchBar!
    @IBOutlet private weak var collectionView: UICollectionView!
    private weak var delegate: SearchViewControllerDelegate?
    private var searchController: SearchController? = nil
    private var dataSource: UICollectionViewDiffableDataSource<Section, SearchController.Element>!
    private var nameFilter: String?
    private var type: SearchType?

    enum Section: CaseIterable {
        case main
    }

    init?(coder: NSCoder, delegate: SearchViewControllerDelegate, type: SearchType) {
        self.delegate = delegate
        searchController = SearchController(type: type)
        super.init(coder: coder)
        self.type = type
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        configureHierarchy()
        configureDataSource()
        searchController?.load { [weak self] in
            self?.performQuery(with: nil)
        }
    }

    @IBAction func didBackButtonTapped(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
    }

    @IBAction func didDoneButtonTapped(_ sender: UIButton) {
        // TODO 네트워크 연결해서 fetch 받아오는 기능 추가
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
}

extension FilterSearchViewController {
    func configureDataSource() {
        let cellRegistration = UICollectionView.CellRegistration
        <ElementView, SearchController.Element> { (cell, indexPath, element) in
            // Populate the cell with our item description.
            cell.label.text = element.name
            if element.checkable {
                cell.accessories = [.checkmark()]
            } else {
                cell.accessories = []
            }
        }

        dataSource = UICollectionViewDiffableDataSource<Section, SearchController.Element>(collectionView: collectionView) {
            (collectionView: UICollectionView, indexPath: IndexPath, identifier: SearchController.Element) -> UICollectionViewCell? in
            // Return the cell.
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: identifier)
        }
    }

    func performQuery(with filter: String?) {
        guard let elements = searchController?.filteredElements(with: filter)
                .sorted(by: { $0.name < $1.name }) else {
            return
        }

        var snapshot = NSDiffableDataSourceSnapshot<Section, SearchController.Element>()
        snapshot.appendSections([.main])
        snapshot.appendItems(elements)
        dataSource.apply(snapshot, animatingDifferences: true)
    }
}

extension FilterSearchViewController {
    func createLayout() -> UICollectionViewLayout {
        let layout = UICollectionViewCompositionalLayout { (sectionIndex: Int,
                                                            layoutEnvironment: NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection in

            let contentSize = layoutEnvironment.container.effectiveContentSize
            let columns = contentSize.width > 800 ? 3 : 2
            let spacing = CGFloat(10)

            let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                  heightDimension: .fractionalHeight(1.0))
            let item = NSCollectionLayoutItem(layoutSize: itemSize)

            let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                   heightDimension: .absolute(32))
            let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: columns)
            group.interItemSpacing = .fixed(spacing)

            let section = NSCollectionLayoutSection(group: group)
            section.interGroupSpacing = spacing
            section.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 10, bottom: 10, trailing: 10)

            return section
        }
        return layout
    }

    func configureHierarchy() {
        view.backgroundColor = .systemBackground
        let layout = createLayout()
        collectionView.collectionViewLayout = layout
        searchBar.delegate = self
        collectionView.delegate = self
    }
}

extension FilterSearchViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        performQuery(with: searchText)
    }

    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
    }
}


extension FilterSearchViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let data = self.dataSource.itemIdentifier(for: indexPath) else {
            collectionView.deselectItem(at: indexPath, animated: true)
            return
        }

        var newData = data
        newData.checkable = !data.checkable

        var newSnapshot = dataSource.snapshot()
        newSnapshot.insertItems([newData], beforeItem: data)
        newSnapshot.deleteItems([data])
        dataSource.apply(newSnapshot)
    }
}
