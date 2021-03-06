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

struct Milestone: Model, Codable {
    let id: Int
    var title, content, deadline: String
    let isOpened: Bool
    let openCount: Int?
    let totalCount: Int?
    
    enum CodingKeys: String, CodingKey {
        case id, title, content, deadline
        case isOpened = "is_opened"
        case openCount, totalCount
    }
}

extension Milestone: Hashable {
    static func == (rhs: Milestone, lhs: Milestone) -> Bool {
        return rhs.id == lhs.id &&
            rhs.title == lhs.title &&
            rhs.content == lhs.content &&
            rhs.deadline == lhs.deadline &&
            rhs.isOpened == lhs.isOpened &&
            rhs.openCount == lhs.openCount &&
            rhs.totalCount == lhs.totalCount
    }
}
