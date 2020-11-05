//
//  Milestone.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation

struct Milestones: Codable {
    let milestones: [Milestone]
}

struct Milestone: Codable {
    let id: Int
    let title, content, deadline: String
    let isOpened: Bool
    let openCount: Int?
    let totalCount: Int?
    
    enum CodingKeys: String, CodingKey {
        case id, title, content, deadline
        case isOpened = "is_opened"
        case openCount, totalCount
    }
}
