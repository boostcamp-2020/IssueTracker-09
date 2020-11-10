//
//  MilestoneCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import UIKit

class MilestoneCoordinator: Coordinator {
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: Coordinator] = [: ]
    private weak var delegate: MainTabBarDelegate?
    
    init(window: UIWindow, delegate: MainTabBarDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        guard let milestoneViewController = UIStoryboard(name: "Milestone", bundle: nil).instantiateInitialViewController() as? MilestoneViewController else {
            return
        }
        milestoneViewController.delegate = self
        milestoneViewController.service = MilestoneCacheService(delegate: milestoneViewController)
        milestoneViewController.tabBarItem = UITabBarItem(title: "Milestone", image: UIImage(systemName: "calendar.circle"), selectedImage: UIImage(systemName: "calendar.circle.fill"))
        
        delegate?.setViewController(milestoneViewController, name: .Milestone)
    }
}

extension MilestoneCoordinator: MilestoneViewControllerDelegate {
    func moveToMilestone() {

    }
}
