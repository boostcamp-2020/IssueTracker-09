//
//  MilestoneViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import UIKit

extension Notification.Name {
    static let didMilestoneAppend = Notification.Name(rawValue: "MilestoneViewController.didMilestoneAppend")
}

protocol MilestoneViewControllerDelegate: AnyObject {
    func moveToMilestone()
}

class MilestoneViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    
    var service: MilestoneService?
    weak var delegate: MilestoneViewControllerDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        collectionView.collectionViewLayout = createLayout()
        service?.reloadData()
        configRightItem()
        NotificationCenter.default.addObserver(self, selector: #selector(didMilestoneAppend), name: .didMilestoneAppend, object: nil)
    }
    
    func configRightItem() {
        let barButtonItem = UIBarButtonItem(systemItem: .add)
        barButtonItem.target = self
        barButtonItem.action = #selector(didAddButtonTapped)
        navigationItem.rightBarButtonItem = barButtonItem
    }
    
    @objc func didAddButtonTapped(_ sender: UIBarButtonItem) {
        guard let viewController = UIStoryboard(name: "MilestoneAppend", bundle: nil).instantiateInitialViewController() as? MilestoneAppendViewController else {
            return
        }
        
        present(viewController, animated: true, completion: nil)
    }
    
    @objc func didMilestoneAppend(_ notification: Notification) {
        service?.reloadData()
        scrollToLast()
    }
    
    // https://stackoverflow.com/a/47036507
    func scrollToLast() {
        let numberOfSections = collectionView.numberOfSections
        let numberOfItems = collectionView.numberOfItems(inSection: numberOfSections - 1)
        let lastItemIndexPath = IndexPath(item: numberOfItems - 1,
                                          section: numberOfSections - 1)
        
        guard numberOfSections > 0, numberOfItems > 0 else {
            return
        }
        
        collectionView.scrollToItem(at: lastItemIndexPath, at: .bottom, animated: true)
    }
}

extension MilestoneViewController {
    func createLayout() -> UICollectionViewLayout {
        let layout = UICollectionViewCompositionalLayout { (sectionIndex: Int,
            layoutEnvironment: NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection in

            let spacing = CGFloat(10)

            let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                  heightDimension: .fractionalHeight(1.0))
            let item = NSCollectionLayoutItem(layoutSize: itemSize)

            let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                   heightDimension: .fractionalWidth(0.3))
            let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: 1)
            group.interItemSpacing = .fixed(spacing)

            let section = NSCollectionLayoutSection(group: group)
            section.interGroupSpacing = spacing
            section.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 10, bottom: 10, trailing: 10)

            return section
        }
        return layout
    }
}

extension MilestoneViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let storyBoard = UIStoryboard(name: "MilestoneAppend", bundle: nil)
        guard let milestoneAppendViewController = storyBoard.instantiateInitialViewController() as? MilestoneAppendViewController else {
            return
        }
        
        navigationController?.present(milestoneAppendViewController, animated: true, completion: nil)
        
        if let milestone = service?[at: indexPath] {
            milestoneAppendViewController.config(milestone: milestone)
        }
    }
}

extension MilestoneViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        service?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath) as? MilestoneCollectionViewCell,
              let milestone = service?[at: indexPath] else {
            return UICollectionViewCell()
        }
        cell.config(milestone: milestone)
        return cell
    }
}

extension MilestoneViewController: MileStoneServiceDelegate {
    func didDataLoaded() {
        collectionView.reloadData()
    }
}
