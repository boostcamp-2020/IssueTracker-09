//
//  IssueDetailCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit

class IssueDetailCoordinator: Coordinator {
    private enum StoryboardName: String {
        case IssueDetail, IssueBottomSheet
    }
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String : Coordinator] = [:]
    private weak var parent: UIViewController?
    
    private var issue: Issue
    
    required init(window: UIWindow, parent: UIViewController, issue: Issue) {
        self.window = window
        self.parent = parent
        self.issue = issue
    }
    
    func start() {
        let storyBoard = UIStoryboard(name: StoryboardName.IssueDetail.rawValue, bundle: nil)
        let issueDeatailViewController = storyBoard.instantiateViewController(
            identifier: "IssueDetailViewController",
            creator: {
                coder in
                return IssueDetailViewController(coder: coder)
            })
        
        issueDeatailViewController.service = IssueDetailCacheService(issue: issue, delegate: issueDeatailViewController)
         
        (parent as? UINavigationController)?.pushViewController(issueDeatailViewController, animated: true)
    }
}
