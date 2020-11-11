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
    
    var query: IssueFilterQuery {
        var isOpen: Bool? = nil
        var author: String? = nil
        var assignee: String? = nil
        if let condition = FilterContext.shared.condition,
           let element = Filter.Element.condition(rawValue: condition),
           let name = PersistenceManager.shared.load(forKey: .name) {
            switch element {
            case .openIssues:
                isOpen = true
            case .closedIssues:
                isOpen = false
            case .selfWrite:
                author = name
            case .selfAssignee:
                assignee = name
            default:
                break
            }
        }
        
        if let writer = self.writer {
            author = writer.name
        }
        
        if let selfAssignee = self.assignee {
            assignee = selfAssignee.name
        }
        
        return IssueFilterQuery(isOpen: isOpen, author: author, assignee: assignee)
    }
}
