//
//  Assignee.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

struct Assignees: Model, Codable {
    let assignees: [User]
    
    enum CodingKeys: String, CodingKey {
        case assignees = "assignee"
    }
    
    func find(id: Int) -> User? {
        for user in assignees {
            if user.id == id {
                return user
            }
        }
        return nil
    }
}
