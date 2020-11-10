//
//  IssueDetailCacheService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

class IssueDetailCacheService: IssueDetailService {
    var issue: Issue
    private var commentNetrworkService = CommentNetworkService()
    private var assigneeNetworkService = AssigneeNetworkService()
    private weak var delegate: IssueDetailServiceDelegate?
    
    init(issue: Issue, delegate: IssueDetailServiceDelegate?) {
        self.issue = issue
        self.delegate = delegate
    }
    
    func requestComments() {
        commentNetrworkService.fetchComments(issue: issue) { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .success( _):
                if let comments = try? result.get().comments {
                    self.delegate?.didCommentsLoaded(comments: comments)
                }
            case .failure(let error):
                print(error.errorDescription ?? "")
            }
        }
    }
    
    func requestUsers() {
        assigneeNetworkService.fetchAssignee { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .success( _):
                if let assignee = try? result.get().assignees {
                    self.delegate?.didAssigneeLoaded(assignee: assignee)
                }
            case .failure(let error):
                print(error.errorDescription ?? "")
            }
        }
    }
}
