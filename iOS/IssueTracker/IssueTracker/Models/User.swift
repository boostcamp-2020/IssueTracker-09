//
//  User.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import Foundation

struct Assignees: Codable {
    let assignees: [User]
    
    enum CodingKeys: String, CodingKey {
        case assignees = "assignee"
    }
}

struct User: Codable {
    let id: Int
    let name: String
    let image: String?
    let userCode: String?
    
    enum CodingKeys: String, CodingKey {
        case id
        case name, image
        case userCode = "user_code"
    }
}
