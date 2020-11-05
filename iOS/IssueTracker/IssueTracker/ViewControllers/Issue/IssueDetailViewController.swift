//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/04.
//

import UIKit

class IssueDetailViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        collectionView.collectionViewLayout = createLayout()
        addBottomSheetView()
    }
    
    func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .grouped)
        configuration.showsSeparators = false
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
}

extension IssueDetailViewController {
    func addBottomSheetView() {
        
        guard let bottomSheetVC = UIStoryboard(name: "IssueBottomSheet", bundle: nil).instantiateInitialViewController() as? IssueBottomSheetViewController else {
            return
        }
        
        
//        let bottomSheetVC = IssueBottomSheetViewController()
        
        self.addChild(bottomSheetVC)
        self.view.addSubview(bottomSheetVC.view)
        bottomSheetVC.didMove(toParent: self)

        let height = view.frame.height
        let width  = view.frame.width
        bottomSheetVC.view.frame = CGRect(x: 0, y: self.view.frame.maxY, width: width, height: height)
    }
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
