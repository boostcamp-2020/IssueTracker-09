//
//  IssueDetailCacheService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

class IssueEditCacheService: IssueEditService {
    var issue: Issue
    private var networkService = IssueNetworkService()
    private weak var delegate: IssueEditServiceDelegate?
    
    init(issue: Issue, delegate: IssueEditServiceDelegate?) {
        self.issue = issue
        self.delegate = delegate
    }
    
    func willEditAssignee(old: [User], new: [User]) {
        let uncheckedUsers = Array(Set(old).subtracting(new))
        let checkedUsers = Array(Set(new).subtracting(old))
        
        networkService.modifyIssueAssignee(of: issue.id, checked: checkedUsers, unchecked: uncheckedUsers) { [weak self] result in
            switch result {
            case .success(let response):
                self?.delegate?.didAssigneeLoaded(isSuccess: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
    
    func willEditLabels(old: [Label], new: [Label]) {
        let uncheckedLabels = Array(Set(old).subtracting(new))
        let checkedLabels = Array(Set(new).subtracting(old))
        
        networkService.modifyIssueLabels(of: issue.id, checked: checkedLabels, unchecked: uncheckedLabels) { [weak self] result in
            switch result {
            case .success(let response):
                self?.delegate?.didLabelsLoaded(isSuccess: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
    
    func willEditMilestone(new: Milestone) {
        networkService.modifyIssueMilestone(of: issue.id, to: new) { [weak self] result in
            switch result {
            case .success(let response):
                self?.delegate?.didMilestoneLoaded(isSuccess: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
}
