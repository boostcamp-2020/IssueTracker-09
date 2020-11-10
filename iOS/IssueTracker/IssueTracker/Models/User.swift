//
//  User.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import Foundation

struct User: Codable, Hashable {
    let id: Int
    let name: String
    let image: String?
    let userCode: String?

    enum CodingKeys: String, CodingKey {
        case id
        case name, image
        case userCode = "user_code"
    }

    static func == (lhs: User, rhs: User) -> Bool {
        return lhs.id == rhs.id &&
            lhs.name == rhs.name &&
            lhs.userCode == rhs.userCode &&
            lhs.image == rhs.userCode
    }
}
