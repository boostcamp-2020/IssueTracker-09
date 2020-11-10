//
//  FilterContext.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/10.
//

import Foundation

struct FilterContext {
    let condition: Int?
    let writer: User?
    let label: Label?
    let milestone: Milestone?
    let assignee: User?
}
