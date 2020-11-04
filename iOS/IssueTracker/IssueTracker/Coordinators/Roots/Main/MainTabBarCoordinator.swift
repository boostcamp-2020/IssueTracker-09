//
//  IssueCoordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class MainTabBarCoordinator: Coordinator {
    private enum ChildName: String {
        case Filter
    }
    
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: ChildCoordinator] = [: ]
    
    private let storyboardName: String = "Issue"
    private let navigationController = UINavigationController()
    private weak var delegate: RootCoordinateControllerDelegate?
    
    init(window: UIWindow, delegate: RootCoordinateControllerDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        guard let issueViewController = UIStoryboard(name: "Issue", bundle: nil).instantiateInitialViewController() as? IssueViewController else {
            return
        }
        issueViewController.delegate = self
        issueViewController.service = LocalIssueService()
        
        navigationController.viewControllers = [issueViewController]
        window.rootViewController = navigationController
        window.makeKeyAndVisible()
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

