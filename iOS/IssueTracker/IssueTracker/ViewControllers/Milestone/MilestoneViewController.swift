//
//  MilestoneViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import UIKit


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
    }
}

extension MilestoneViewController {
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
                                                   heightDimension: .fractionalWidth(0.35))
            let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: columns)
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
    
}

extension MilestoneViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        service?.count ?? 0
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath) as? MilestoneCollectionViewCell else {
            return UICollectionViewCell()
        }
        
        return cell
    }
}

extension MilestoneViewController: MileStoneServiceDelegate {
    func didDataLoaded() {
        collectionView.reloadData()
    }
}
