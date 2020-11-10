//
//  IssueCoordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

protocol MainTabBarDelegate: AnyObject {
    func setViewController(_ viewController: UIViewController, name: TabName)
}

enum TabName: String {
    case Issue, Milestone
}

class MainTabBarCoordinator: Coordinator {
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: Coordinator] = [: ]
    
    private let tabBarController = UITabBarController()
    private weak var delegate: RootCoordinateControllerDelegate?
    
    init(window: UIWindow, delegate: RootCoordinateControllerDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        window.rootViewController = tabBarController
        prepareChileCoordiantors()
        window.makeKeyAndVisible()
    }
    
    func prepareChileCoordiantors() {
        let issueCoordinator = IssueCoordinator(window: window, delegate: self)
//        let milestoneCoordinator = IssueCoordinator(window: window, delegate: self)
        
        childCoordinators[TabName.Issue.rawValue] = issueCoordinator
//        childCoordinators[TabName.Milestone.rawValue] = milestoneCoordinator
        issueCoordinator.start()
//        milestoneCoordinator.start()
    }
}
extension MainTabBarCoordinator: MainTabBarDelegate {
    func setViewController(_ viewController: UIViewController, name: TabName) {
        switch name {
        case .Issue:
            viewController.tabBarItem = UITabBarItem(title: "Issue", image: UIImage(systemName: "bell.circle"), selectedImage: UIImage(systemName: "bell.circle.fill"))
        case .Milestone:
            viewController.tabBarItem = UITabBarItem(title: "Milestone", image: UIImage(systemName: "calendar.circle"), selectedImage: UIImage(systemName: "calendar.circle.fill"))
        }
        tabBarController.addChild(viewController)
    }
}

//
//        guard let milestoneViewController = UIStoryboard(name: StoryboardName.Milestone.rawValue, bundle: nil).instantiateInitialViewController() as? MilestoneViewController else {
//            return
//        }
//        milestoneViewController.delegate = self
//        milestoneViewController.service = MilestoneCacheService(delegate: milestoneViewController)
//        milestoneViewController.tabBarItem = UITabBarItem(title: "Milestone", image: UIImage(systemName: "calendar.circle"), selectedImage: UIImage(systemName: "calendar.circle.fill"))
//
//        navigationController.viewControllers = [issueViewController]
//        navigationController.tabBarItem = UITabBarItem(title: "Issue", image: UIImage(systemName: "bell.circle"), selectedImage: UIImage(systemName: "bell.circle.fill"))
//
//        tabBarController.setViewControllers([navigationController, milestoneViewController], animated: true)
