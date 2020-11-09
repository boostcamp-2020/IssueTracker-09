//
//  IssueDetailService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

protocol IssueDetailService {
    var issue: Issue { get set }
    func requestComments()
    func requestUsers()
}

protocol IssueDetailServiceDelegate: AnyObject {
    func didCommentsLoaded(comments: [Comment])
    func didAssigneeLoaded(assignee: [User])
}
