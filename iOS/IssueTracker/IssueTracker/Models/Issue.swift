//
//  Issue.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

struct Issues: Codable {
    var issues: [Issue]
}

struct Issue: Codable {
    let id: Int
    let title: String
    let isOpened: Bool
    let timestamp: String
    let assignees: [User]?
    let milestone: Milestone?
    let user: User?
    let labels: [Label]?
    
    enum CodingKeys: String, CodingKey {
        case id, title
        case isOpened = "is_opened"
        case timestamp
        case assignees = "Assignees"
        case milestone = "Milestone"
        case user = "User"
        case labels = "Labels"
    }
}

extension Issue: Hashable {
    static func == (rhs: Issue, lhs: Issue) -> Bool {
        return rhs.id == lhs.id &&
            rhs.title == lhs.title &&
            rhs.isOpened == lhs.isOpened &&
            rhs.timestamp == lhs.timestamp &&
            rhs.assignees == lhs.assignees &&
            rhs.milestone == lhs.milestone &&
            rhs.user == lhs.user &&
            rhs.labels == lhs.labels
    }
}
