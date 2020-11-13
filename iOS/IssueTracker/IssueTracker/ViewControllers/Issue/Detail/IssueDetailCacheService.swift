//
//  IssueDetailCacheService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

class IssueDetailCacheService: IssueDetailService {
    var issue: Issue
    private let commentNetworkService = CommentNetworkService()
    private let assigneeNetworkService = AssigneeNetworkService()
    private let labelsNetworkService = LabelNetworkService()
    private let milestoneNetworkService = MilestoneNetworkService()
    private let userNetworkService = UserNetworkService()
    private weak var delegate: IssueDetailServiceDelegate?
    
    init(issue: Issue, delegate: IssueDetailServiceDelegate?) {
        self.issue = issue
        self.delegate = delegate
    }
    
    func requestComments() {
        commentNetworkService.fetchComments(issue: issue) { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .success(let data):
                let comments = data.comments
                self.delegate?.didCommentsLoaded(comments: comments)
            case .failure( _):
                self.delegate?.didCommentsLoaded(comments: nil)
            }
        }
    }
    
    func requestUsers() {
        assigneeNetworkService.fetchAssignees { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .success(let data):
                let assignee = data.assignees
                self.delegate?.didAssigneesLoaded(assignee: assignee)
            case .failure( _):
                self.delegate?.didAssigneesLoaded(assignee: nil)
            }
        }
    }
    
    func requestLabels() {
        labelsNetworkService.fetchLabels { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .success(let data):
                let labels = data.labels
                self.delegate?.didLabelsLoaded(labels: labels)
            case .failure( _):
                self.delegate?.didLabelsLoaded(labels: nil)
            }
        }
    }
    
    func requestMilestones() {
        milestoneNetworkService.fetchMilestones { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .success(let data):
                let milestones = data.milestones
                self.delegate?.didMilestonesLoaded(milestones: milestones)
            case .failure( _):
                self.delegate?.didMilestonesLoaded(milestones: nil)
            }
        }
    }
    
    func deleteComment(_ comment: Comment, userName: String?) {
        userNetworkService.status { [weak self] result in
            guard let user = try? result.get(),
                  let userName = userName,
                  user.name == userName else {
                self?.delegate?.didReceivedError(description: "본인이 작성한 댓글만 삭제할 수 있습니다")
                return
            }
            
            self?.commentNetworkService.deleteComment(comment: comment) { [weak self] result in
                switch result {
                case .success(_):
                    self?.requestComments()
                case .failure(let error):
                    self?.delegate?.didReceivedError(description: error.localizedDescription)
                }
            }
        }
    }
}
