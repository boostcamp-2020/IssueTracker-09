//
//  FileElement.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/03.
//

import Foundation

enum SearchType {
    case User
    case Label
    case Milestone
}

class SearchController {
    private var elements = [Element]()
    private let type: SearchType
    
    struct Element: Hashable {
        let name: String
        let type: SearchType
        let id: Int
        var checkable: Bool = false
        
        static func == (lhs: Element, rhs: Element) -> Bool {
            return lhs.name == rhs.name &&
                lhs.type == rhs.type &&
                lhs.id == rhs.id &&
                lhs.checkable == rhs.checkable
        }
    }
    
    init(type: SearchType) {
        self.type = type
    }
    
    func filteredElements(with filter: String? = nil, limit: Int? = nil) -> [Element] {
        var elements = self.elements
        if let filter = filter, !filter.isEmpty {
            elements = elements.filter { $0.name.lowercased().contains(filter.lowercased()) }
        }
        
        if let limit = limit {
            return Array(elements.prefix(through: limit))
        } else {
            return elements
        }
    }
    
    func load(completion: @escaping () -> Void) {
        switch type {
        case .User:
            loadAssignees(completion: completion)
        case .Label:
            loadLabels(completion: completion)
        case .Milestone:
            loadMilestones(completion: completion)
        }
    }
    
    private func loadAssignees(completion: @escaping () -> Void) {
        UserNetworkService().fetchAssignees { [weak self] result in
            guard let assignees = try? result.get().assignees else {
                return
            }
            
            self?.elements = assignees.map { Element(name: $0.name, type: .User, id: $0.id) }
            completion()
        }
    }
    
    private func loadLabels(completion: @escaping () -> Void) {
        LabelNetworkService().fetchLabels { [weak self] result in
            guard let labels = try? result.get().labels else {
                return
            }
            
            self?.elements = labels.map { Element(name: $0.title, type: .User, id: $0.id) }
            completion()
        }
    }
    
    private func loadMilestones(completion: @escaping () -> Void) {
        MilestoneNetworkService().fetchMilestones { [weak self] result in
            guard let milestones = try? result.get().milestones else {
                return
            }
            
            self?.elements = milestones.map { Element(name: $0.title, type: .User, id: $0.id) }
            completion()
        }
    }
}
