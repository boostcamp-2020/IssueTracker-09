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
        service?.reloadData()
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
