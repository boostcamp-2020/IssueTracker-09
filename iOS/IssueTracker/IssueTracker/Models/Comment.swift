//
//  Comment.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation

struct Comments: Codable {
    let comments: [Comment]
}

struct Comment: Model, Codable {
    let id: Int
    let content: String
    let timestamp: String
    let user_id: Int
    let issue_id: Int?
}
