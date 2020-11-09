//
//  Assignee.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation

struct Assignee: Codable {
    let assignee: [User]
    
    func find(id: Int) -> User? {
        for user in assignee {
            if user.id == id {
                return user
            }
        }
        return nil
    }
}
