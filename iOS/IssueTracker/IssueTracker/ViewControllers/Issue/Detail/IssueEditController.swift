//
//  IssueEditcontroller.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import Foundation

class IssueEditController {
    private let key: EditKey
    private let data: Data
    var items: [EditItem] {
        return marshalling(key: key).items
    }
    
    init (key: EditKey, data: Data) {
        self.key = key
        self.data = data
    }
    
    private func marshalling(key: EditKey) -> EditItems {
        var result: [EditItem] = []
        switch key {
        case .assignee:
            let assignees = DeserializedAssignees()
            result = assignees?.assignees.map { assignee -> EditItem in
                return EditItem(id: assignee.id , content: assignee.name, checkable: false)
            } ?? []
        case .label:
            let labels = DeserializedLabels()
            result = labels?.labels.map({ label -> EditItem in
                return EditItem(id: label.id, content: label.content, checkable: false)
            }) ?? []
        case .milestone:
            let milestones = DeserializedMilestones()
            result = milestones?.milestones.map({ milestone -> EditItem in
                return EditItem(id: milestone.id, content: milestone.title, checkable: false)
            }) ?? []
        }
        
        return EditItems(items: result)
    }
    
    private func DeserializedAssignees() -> Assignees? {
        let decoder = JSONDecoder()
        do {
            let result = try decoder.decode(Assignees.self, from: data)
            return result
        } catch {
            return nil
        }
    }
    
    private func DeserializedLabels() -> Labels? {
        let decoder = JSONDecoder()
        do {
            let result = try decoder.decode(Labels.self, from: data)
            return result
        } catch {
            return nil
        }
    }
    
    private func DeserializedMilestones() -> Milestones? {
        let decoder = JSONDecoder()
        do {
            let result = try decoder.decode(Milestones.self, from: data)
            return result
        } catch {
            return nil
        }
    }
}
