//
//  FileElement.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/03.
//

import Foundation

class SearchController {
    private var elements = [Element]()
    private let type: Filter.Element
    
    struct Element: Hashable {
        let name: String
        let type: Filter.ModelType
        let id: Int
        let rawModel: Model
        var checkable: Bool = false
        
        static func == (lhs: Element, rhs: Element) -> Bool {
            return lhs.name == rhs.name &&
                lhs.type == rhs.type &&
                lhs.id == rhs.id &&
                lhs.checkable == rhs.checkable
        }
        
        func hash(into hasher: inout Hasher) {
            hasher.combine(name)
            hasher.combine(type)
            hasher.combine(id)
            hasher.combine(checkable)
        }
    }
    
    init(type: Filter.Element) {
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
        switch type.modelType {
        case .user:
            loadAssignees(completion: completion)
        case .label:
            loadLabels(completion: completion)
        case .milestone:
            loadMilestones(completion: completion)
        default:
            return
        }
    }
    
    private func loadAssignees(completion: @escaping () -> Void) {
        AssigneeNetworkService().fetchAssignees { [weak self] result in
            guard let assignees = try? result.get().assignees else {
                return
            }
            
            self?.elements = assignees.compactMap { assignee in
                guard let id = assignee.id else {
                    return nil
                }
                return Element(name: assignee.name, type: .user, id: id, rawModel: assignee)
            }
            completion()
        }
    }
    
    private func loadLabels(completion: @escaping () -> Void) {
        LabelNetworkService().fetchLabels { [weak self] result in
            guard let labels = try? result.get().labels else {
                return
            }
            
            self?.elements = labels.map { Element(name: $0.title, type: .label, id: $0.id, rawModel: $0) }
            completion()
        }
    }
    
    private func loadMilestones(completion: @escaping () -> Void) {
        MilestoneNetworkService().fetchMilestones { [weak self] result in
            guard let milestones = try? result.get().milestones else {
                return
            }
            
            self?.elements = milestones.map { Element(name: $0.title, type: .milestone, id: $0.id, rawModel: $0) }
            completion()
        }
    }
}
