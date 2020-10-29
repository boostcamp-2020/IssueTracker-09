//
//  IssueService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

protocol IssueService {
    var count: Int { get }
    subscript(at: Int) -> Issue { get }
    func remove(indexOf: Int)
}
