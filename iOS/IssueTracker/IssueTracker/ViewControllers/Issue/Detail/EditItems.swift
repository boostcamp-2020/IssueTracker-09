//
//  EditItems.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import Foundation

struct EditItems {
    let items: [EditItem]
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
