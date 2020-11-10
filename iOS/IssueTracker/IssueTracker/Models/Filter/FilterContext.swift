//
//  FilterContext.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/10.
//

import Foundation

class FilterContext {
    static var shared = FilterContext()
    private init() {}
    
    var condition: Int? = nil
    var writer: User? = nil
    var label: Label? = nil
    var milestone: Milestone? = nil
    var assignee: User? = nil
    
    func clear() {
        condition = nil
        writer = nil
        label = nil
        milestone = nil
        assignee = nil
    }
}
