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
    let issueLabel: IssueLabel?
    
    enum CodingKeys: String, CodingKey {
        case id, color, title, content
        case issueLabel = "Issue_Label"
    }
}

struct IssueLabel: Codable {
    let issueID, labelID: Int
    
    enum CodingKeys: String, CodingKey {
        case issueID = "issue_id"
        case labelID = "label_id"
    }
}
