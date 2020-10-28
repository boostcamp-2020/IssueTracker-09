//
//  IssueCoordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class IssueCoordinator: Coordinator {
    private let storyboardName: String = "Issue"
    private let window: UIWindow
    
    init(window: UIWindow? = UIWindow()) {
        if let window = window {
            self.window = window
        } else {
            self.window = UIWindow()
        }
    }
    
    func start() {
        window.makeKeyAndVisible()

        guard let issueViewController = UIStoryboard(name: "Issue", bundle: nil).instantiateInitialViewController() as? IssueViewController else {
            return
        }
        issueViewController.delegate = self
        issueViewController.service = LocalIssueService()
        
        let navigationController = UINavigationController()
        navigationController.viewControllers = [issueViewController]
        window.rootViewController = navigationController
        window.makeKeyAndVisible()
    }
}

extension IssueCoordinator: NextCoordinatorDelegate {
    func navigateToPage() {
        print("move next page")
    }
}
