//
//  EditItems.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import Foundation

struct EditItems {
    var items: [EditItem]
    
    private func indexOf(id: Int) -> Int? {
        var index = 0
        
        for item in items {
            if item.id == id { return index }
            index += 1
        }
        return nil
    }
    
    mutating func checkItem(id: Int) {
        guard let index = self.indexOf(id: id) else { return }
        items[index].checkable = true
    }
}

struct EditItem: Hashable {
    let id: Int
    let content: String
    var checkable: Bool
    
    static func == (lhs: EditItem, rhs: EditItem) -> Bool {
        return lhs.id == rhs.id &&
            lhs.content == rhs.content &&
            lhs.checkable == rhs.checkable
    }
}
