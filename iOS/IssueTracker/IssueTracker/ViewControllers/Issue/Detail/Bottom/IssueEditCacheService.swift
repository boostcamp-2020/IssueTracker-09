//
//  IssueDetailCacheService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

class IssueEditCacheService: IssueEditService {
    var issue: Issue
    private var issueNetworkService = IssueNetworkService()
    private var commentNetworkService = CommentNetworkService()
    private weak var delegate: IssueEditServiceDelegate?
    
    init(issue: Issue, delegate: IssueEditServiceDelegate?) {
        self.issue = issue
        self.delegate = delegate
    }
    
    func willAddComment(content: String) {
        commentNetworkService.addComment(issue: issue, content: content) { [weak self] result in
            switch result {
            case .success(let isSuccess):
                self?.delegate?.willUpdateIssue(isSuccess: isSuccess)
            case .failure( _):
                self?.delegate?.willUpdateIssue(isSuccess: false)
            }
        }
    }
    
    func willEditAssignee(old: [User], new: [User]) {
        let uncheckedUsers = Array(Set(old).subtracting(new))
        let checkedUsers = Array(Set(new).subtracting(old))
        
        issueNetworkService.modifyIssueAssignee(of: issue.id,
                                                checked: checkedUsers,
                                                unchecked: uncheckedUsers) { [weak self] result in
            switch result {
            case .success(let response):
                self?.delegate?.willUpdateIssue(isSuccess: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
    
    func willEditLabels(old: [Label], new: [Label]) {
        let uncheckedLabels = Array(Set(old).subtracting(new))
        let checkedLabels = Array(Set(new).subtracting(old))
        
        issueNetworkService.modifyIssueLabels(of: issue.id,
                                              checked: checkedLabels,
                                              unchecked: uncheckedLabels) { [weak self] result in
            switch result {
            case .success(let response):
                self?.delegate?.willUpdateIssue(isSuccess: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
    
    func willEditMilestone(new: Milestone) {
        issueNetworkService.modifyIssueMilestone(of: issue.id, to: new) { [weak self] result in
            switch result {
            case .success(let response):
                self?.delegate?.willUpdateIssue(isSuccess: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
}
