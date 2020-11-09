//
//  IssueDetailService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

protocol IssueEditService {
    var issue: Issue { get set }
    func willEditAssignee(old: [User], new: [User])
    func willEditLabels(old: [Label], new: [Label])
    func willEditMilestone(new: Milestone)
    
    // func willChangeStatus() 
}

protocol IssueEditServiceDelegate: AnyObject {
    func didAssigneeLoaded(isSuccess: Bool)
    func didLabelsLoaded(isSuccess: Bool)
    func didMilestoneLoaded(isSuccess: Bool)
}
