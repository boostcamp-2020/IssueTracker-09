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
    case issue = "Issue"
    case milestone = "Milestone"
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
        let milestoneCoordinator = MilestoneCoordinator(window: window, delegate: self)
        
        childCoordinators[TabName.issue.rawValue] = issueCoordinator
        childCoordinators[TabName.milestone.rawValue] = milestoneCoordinator
        issueCoordinator.start()
        milestoneCoordinator.start()
    }
}
extension MainTabBarCoordinator: MainTabBarDelegate {
    func setViewController(_ viewController: UIViewController, name: TabName) {
        switch name {
        case .issue:
            viewController.tabBarItem = UITabBarItem(title: "Issue",
                                                     image: UIImage(systemName: "bell.circle"),
                                                     selectedImage: UIImage(systemName: "bell.circle.fill"))
        case .milestone:
            viewController.tabBarItem = UITabBarItem(title: "Milestone",
                                                     image: UIImage(systemName: "calendar.circle"),
                                                     selectedImage: UIImage(systemName: "calendar.circle.fill"))
        }
        tabBarController.addChild(viewController)
    }
}
