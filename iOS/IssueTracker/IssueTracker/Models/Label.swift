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

struct Label: Codable {
    let id: Int
    let color: String
    let title: String
    let content: String
}
