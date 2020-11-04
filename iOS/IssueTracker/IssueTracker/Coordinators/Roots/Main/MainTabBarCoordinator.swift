//
//  IssueCoordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class MainTabBarCoordinator: Coordinator {
    private enum StoryboardName: String {
        case Issue, Milestone
    }
    
    private enum ChildName: String {
        case Filter
    }
    
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: ChildCoordinator] = [: ]
    
    private let tabBarController = UITabBarController()
    private let navigationController = UINavigationController()
    private weak var delegate: RootCoordinateControllerDelegate?
    
    init(window: UIWindow, delegate: RootCoordinateControllerDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        makePage()
        window.rootViewController = tabBarController
        window.makeKeyAndVisible()
    }
    
    func makePage() {
        guard let issueViewController = UIStoryboard(name: StoryboardName.Issue.rawValue, bundle: nil).instantiateInitialViewController() as? IssueViewController else {
            return
        }
        issueViewController.delegate = self
        issueViewController.service = LocalIssueService()
        
        guard let milestoneViewController = UIStoryboard(name: StoryboardName.Milestone.rawValue, bundle: nil).instantiateInitialViewController() as? MilestoneViewController else {
            return
        }
        milestoneViewController.delegate = self
        milestoneViewController.service = MilestoneCacheService(delegate: milestoneViewController)
        
        navigationController.viewControllers = [issueViewController]
        tabBarController.setViewControllers([navigationController, milestoneViewController], animated: true)
    }
}

extension MainTabBarCoordinator: MilestoneViewControllerDelegate {
    func moveToMilestone() {
        
    }
}

extension MainTabBarCoordinator: IssueCoordinatorDelegate {
    func presentToFilterView() {
        if let filterCoordinator = childCoordinators[ChildName.Filter.rawValue] {
            filterCoordinator.start()
        } else {
            let child = FilterCoordinator(window: window, parent: navigationController)
            childCoordinators[ChildName.Filter.rawValue] = child
            child.start()
        }
    }
}

