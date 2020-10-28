//
//  IssueService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

protocol IssueService {
    var issues: [Issue] { get }
    func insert(_ number: Issue)
    func close(_ number: Int)
    func delete(_ number: Int)
}
