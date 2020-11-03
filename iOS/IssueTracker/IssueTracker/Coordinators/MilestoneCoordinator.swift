//
//  MilestoneCoordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import UIKit

class MilestoneCoordinator: Coordinator {
    private let storyboardName: String = "Milestone"
    private let window: UIWindow
    private weak var delegate: CoordinatorDelegate?
    
    init(window: UIWindow, delegate: CoordinatorDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        guard let milestoneViewController = UIStoryboard(name: storyboardName, bundle: nil).instantiateInitialViewController() as? MilestoneViewController else {
            return
        }
        milestoneViewController.delegate = self
        milestoneViewController.service = MilestoneCacheService(delegate: milestoneViewController)
        
        let navigationController = UINavigationController()
        navigationController.viewControllers = [milestoneViewController]
        window.rootViewController = navigationController
        window.makeKeyAndVisible()
    }
}

extension MilestoneCoordinator: NextCoordinatorDelegate {
    func navigateToPage() {
        print("move next page")
    }
}
