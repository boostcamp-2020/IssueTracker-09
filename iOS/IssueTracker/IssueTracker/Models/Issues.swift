//
//  Issues.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import Foundation

class Issues: Codable {
    var issues: [Issue] = []
    
    init(_ issues: [Issue]) {
        self.issues = issues
    }
}
