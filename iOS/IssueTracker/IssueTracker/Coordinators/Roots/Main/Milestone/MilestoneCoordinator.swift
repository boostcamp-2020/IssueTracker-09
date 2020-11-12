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
        
        milestoneViewController.service = MilestoneCacheService(delegate: milestoneViewController)
        milestoneViewController.title = "마일스톤"
        
        let navigationController = UINavigationController()
        navigationController.navigationBar.prefersLargeTitles = true
        navigationController.setViewControllers([milestoneViewController], animated: false)
        
        delegate?.setViewController(navigationController, name: .Milestone)
    }
}
