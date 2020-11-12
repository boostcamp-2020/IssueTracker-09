//
//  IssueCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit

protocol IssueNavigationDelegate: AnyObject {
    func navigationToIssueDetail(issue: Issue)
}

protocol IssuePresentDelegate: AnyObject {
    func presentToFilter()
    func presentToNew()
}

class IssueCoordinator: Coordinator {
    
    private enum ChildCoodinator: String {
        case filter = "Filter"
        case issueAppend = "IssueAppend"
        case issueDetail = "IssueDetail"
    }
    
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: Coordinator] = [:]
    
    private weak var delegate: MainTabBarDelegate?
    private let navigationController = UINavigationController()
    
    init(window: UIWindow, delegate: MainTabBarDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        let storyBoard = UIStoryboard(name: "Issue", bundle: nil)
        let issueViewController = storyBoard.instantiateViewController(
            identifier: "IssueViewController",
            creator: { coder in
                return IssueViewController(coder: coder, delegate: self)
            })
        
        issueViewController.service = IssueCacheService(delegate: issueViewController)
        navigationController.navigationBar.prefersLargeTitles = true
        navigationController.pushViewController(issueViewController, animated: true)
        delegate?.setViewController(navigationController, name: .issue)
    }
}

extension IssueCoordinator: IssueNavigationDelegate {
    func navigationToIssueDetail(issue: Issue) {
        let child = IssueDetailCoordinator(window: window, parent: navigationController, issue: issue)
        childCoordinators[ChildCoodinator.issueDetail.rawValue] = child
        child.start()
    }
}

extension IssueCoordinator: IssuePresentDelegate {
    func presentToNew() {
        let storyBoard = UIStoryboard(name: "IssueAppend", bundle: nil)
        let issueAppendViewController = storyBoard.instantiateViewController(
            identifier: "IssueAppendViewController",
            creator: { coder in
                return IssueAppendViewController(coder: coder)
            })
        navigationController.present(issueAppendViewController, animated: true, completion: nil)
    }
    
    func presentToFilter() {
        if let filterCoordinator = childCoordinators[ChildCoodinator.filter.rawValue] {
            filterCoordinator.start()
        } else {
            let child = FilterCoordinator(window: window, parent: navigationController)
            childCoordinators[ChildCoodinator.filter.rawValue] = child
            child.start()
        }
    }
}
