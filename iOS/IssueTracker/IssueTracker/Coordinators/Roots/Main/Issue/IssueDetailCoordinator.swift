//
//  IssueDetailCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit

class IssueDetailCoordinator: Coordinator {
    private enum StoryboardName: String {
        case IssueDetail, IssueBottomSheet, IssueEdit, Comment
    }
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String : Coordinator] = [:]
    private var issueDetailViewController: IssueDetailViewController?
    private weak var parent: UIViewController?
    
    private var issue: Issue
    
    init(window: UIWindow, parent: UIViewController, issue: Issue) {
        self.window = window
        self.parent = parent
        self.issue = issue
    }
    
    func start() {
        let storyBoard = UIStoryboard(name: StoryboardName.IssueDetail.rawValue, bundle: nil)
        issueDetailViewController = storyBoard.instantiateViewController(
            identifier: "IssueDetailViewController",
            creator: {
                coder in
                return IssueDetailViewController(coder: coder, delegate: self)
            })
        
        guard let viewController = issueDetailViewController else { return }
        viewController.service = IssueDetailCacheService(issue: issue, delegate: viewController)
        
        let navigationController = parent as? UINavigationController
        viewController.title = "이슈 상세"
        navigationController?.pushViewController(viewController, animated: true)
    }
}

extension IssueDetailCoordinator: IssueDetailCoordinatorDelegate {
    func presentToComment() {
        let storyBoard = UIStoryboard(name: StoryboardName.Comment.rawValue, bundle: nil)
        let serive = IssueEditCacheService(issue: issue, delegate: self)
        
        let commentViewController = storyBoard.instantiateViewController(
            identifier: "IssueCommentViewController",
            creator: {
                coder in
                return IssueCommentViewController(coder: coder, service: serive)
            })
        
        parent?.present(commentViewController, animated: true, completion: nil)        
    }
    
    func presentToAssigneeEdit(assignees: Assignees) {
        let encoder = JSONEncoder()
        let data = try! encoder.encode(assignees)
        
        presentToEdit(key: .assignee, data: data)
    }
    
    func presentToLabelEdit(labels: Labels) {
        let encoder = JSONEncoder()
        let data = try! encoder.encode(labels)
        
        presentToEdit(key: .label, data: data)
    }
    
    func presentToMilestoneEdit(milstones: Milestones) {
        let encoder = JSONEncoder()
        let data = try! encoder.encode(milstones)
        
        presentToEdit(key: .milestone, data: data)
    }
    
    func resumeView() {
        updateIssue()
    }
    
    private func presentToEdit(key: EditKey, data: Data) {
        let serive = IssueEditCacheService(issue: issue, delegate: self)
        let storyBoard = UIStoryboard(name: StoryboardName.IssueEdit.rawValue, bundle: nil)
        let issueEditViewController = storyBoard.instantiateViewController(
            identifier: "IssueEditViewController",
            creator: {
                coder in
                return IssueEditViewController(coder: coder, key: key, data: data, service: serive)
            })
        
        parent?.present(issueEditViewController, animated: true, completion: nil)
    }
}

extension IssueDetailCoordinator: IssueEditServiceDelegate {
    func willUpdateIssue(isSuccess: Bool) {
        refreshView(isSuccess: isSuccess)
    }
    
    private func refreshView(isSuccess: Bool) {
        if isSuccess {
            NotificationCenter.default.post(name: .resumeIssueList, object: nil)
            updateIssue()
        } else {
            let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "IssueTracker09", message: "Failed Data Load")
            parent?.present(alert, animated: true, completion: nil)
        }
    }
    
    private func updateIssue() {
        let networkService = IssueNetworkService()
        networkService.issue(id: issue.id) { [weak self] result in
            switch result {
            case .success(let data):
                self?.issue = data
                self?.issueDetailViewController?.issue = self?.issue
            case .failure( _):
                break
            }
            self?.issueDetailViewController?.refreshControl?.endRefreshing()
        }
    }
}

extension Notification.Name {
    static let resumeIssueList = Notification.Name(rawValue: "resumeIssueList")
}

