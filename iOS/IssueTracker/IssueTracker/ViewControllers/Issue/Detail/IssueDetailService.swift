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
    func requestLabels()
    func requestMilestones()
    func requestUsers()
}

protocol IssueDetailServiceDelegate: AnyObject {
    func didCommentsLoaded(comments: [Comment]?)
    func didLabelsLoaded(labels: [Label]?)
    func didMilestonesLoaded(milestones: [Milestone]?)
    func didAssigneesLoaded(assignee: [User]?)
}
