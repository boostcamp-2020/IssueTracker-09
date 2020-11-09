//
//  Label.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation

struct Labels: Codable {
    let labels: [Label]
}

struct Label: Codable, Hashable {
    let id: Int
    let color: String
    let title: String
    let content: String
    
    static func == (rhs: Label, lhs: Label) -> Bool {
        return rhs.id == lhs.id &&
            rhs.color == lhs.color &&
            rhs.title == lhs.title &&
            rhs.content == lhs.content
    }
}
