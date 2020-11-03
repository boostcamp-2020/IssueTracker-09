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
    let title, content: String
    let isOpened: Bool
    let milestone: Milestone?
    let commentCount: Int
    let user: [User]
    let label: [Label]
    
    enum CodingKeys: String, CodingKey {
        case id, title, content
        case isOpened = "is_opened"
        case milestone = "Milestone"
        case commentCount, user, label
    }
}

struct AssigneeIssue: Codable {
    let userID, issueID: Int
    
    enum CodingKeys: String, CodingKey {
        case userID = "user_id"
        case issueID = "issue_id"
    }
}
