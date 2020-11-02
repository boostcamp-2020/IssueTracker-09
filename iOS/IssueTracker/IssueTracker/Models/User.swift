//
//  User.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import Foundation

struct User: Codable {
    let id: Int
    let userCode, name: String
    let image: String
    let assigneeIssue: AssigneeIssue
    
    enum CodingKeys: String, CodingKey {
        case id
        case userCode = "user_code"
        case name, image
        case assigneeIssue = "Assignee_Issue"
    }
}
