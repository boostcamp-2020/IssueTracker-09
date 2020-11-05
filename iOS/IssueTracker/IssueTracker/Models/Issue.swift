//
//  Issue.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

struct Issues: Codable {
    var issue: [Issue]
}

struct Issue: Codable {
    let id: Int
    let title: String
    let content: String?
    let isOpened: Bool
    let timestamp: String
    let userID: Int
    let milestoneID: Int?
    let assignees: [User]?
    let labels: [Label]?
    
    enum CodingKeys: String, CodingKey {
        case id, title, content
        case isOpened = "is_opened"
        case timestamp
        case userID = "user_id"
        case milestoneID = "milestone_id"
        case assignees = "Issues"
        case labels = "Labels"
    }
}
