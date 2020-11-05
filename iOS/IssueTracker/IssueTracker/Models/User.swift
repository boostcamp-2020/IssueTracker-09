//
//  User.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import Foundation

struct User: Codable {
    let id: Int
    let name: String
    let image: String
    
    enum CodingKeys: String, CodingKey {
        case id
        case name, image
    }
}
