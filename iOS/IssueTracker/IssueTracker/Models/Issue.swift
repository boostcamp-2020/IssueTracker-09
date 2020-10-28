//
//  Issue.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

struct Issue: Codable {
    let number: Int
    let title: String
    let description: String
    let sprint: String
    let labels: [String]
    let status: IssueStatus
}

enum IssueStatus: String, Codable {
    case opened
    case closed
}
