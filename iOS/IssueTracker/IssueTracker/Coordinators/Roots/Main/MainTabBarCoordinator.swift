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
    case Issue, Milestone, Label
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
        prepareChildCoordiantors()
        window.makeKeyAndVisible()
    }
    
    func prepareChildCoordiantors() {
        let issueCoordinator = IssueCoordinator(window: window, delegate: self)
        let milestoneCoordinator = MilestoneCoordinator(window: window, delegate: self)
        let labelCootdinator = LabelCoordinator(window: window, delegate: self)
        
        childCoordinators[TabName.Issue.rawValue] = issueCoordinator
        childCoordinators[TabName.Milestone.rawValue] = milestoneCoordinator
        childCoordinators[TabName.Label.rawValue] = labelCootdinator
        issueCoordinator.start()
        milestoneCoordinator.start()
        labelCootdinator.start()
    }
}
extension MainTabBarCoordinator: MainTabBarDelegate {
    func setViewController(_ viewController: UIViewController, name: TabName) {
        switch name {
        case .Issue:
            viewController.title = "이슈"
            viewController.tabBarItem = UITabBarItem(title: "Issue", image: UIImage(systemName: "bell.circle"), selectedImage: UIImage(systemName: "bell.circle.fill"))
        case .Milestone:
            viewController.tabBarItem = UITabBarItem(title: "Milestone", image: UIImage(systemName: "calendar.circle"), selectedImage: UIImage(systemName: "calendar.circle.fill"))
        case .Label:
            viewController.tabBarItem = UITabBarItem(title: "Label", image: UIImage(systemName: "bookmark"), selectedImage: UIImage(systemName: "bookmark.fill"))
            viewController.title = "레이블"
        }
        tabBarController.addChild(viewController)
    }
}

