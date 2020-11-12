//
//  FileElement.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/03.
//

import Foundation

class SearchController {
    struct Element: Hashable {
        let name: String
        let type: SearchType
        let id: Int
        var checkable: Bool = false
        
        enum SearchType {
            case User
            case Label
            case Milestone
        }
        
        static func == (lhs: Element, rhs: Element) -> Bool {
            return lhs.name == rhs.name &&
                lhs.type == rhs.type &&
                lhs.id == rhs.id &&
                lhs.checkable == rhs.checkable
        }
        
        func contains(_ filter: String?) -> Bool {
            guard let filterText = filter else { return true }
            if filterText.isEmpty { return true }
            let lowercasedFilter = filterText.lowercased()
            return name.lowercased().contains(lowercasedFilter)
        }
    }
    
    func filteredElements(with filter: String?=nil, limit: Int?=nil) -> [Element] {
        let filtered = elements.filter { $0.contains(filter) }
        if let limit = limit {
            return Array(filtered.prefix(through: limit))
        } else {
            return filtered
        }
    }
    
    private lazy var elements: [Element] = {
        return [Element(name: "승언", type: .User, id: 0),
                Element(name: "기엽", type: .User, id: 1),
                Element(name: "재우", type: .User, id: 2),
                Element(name: "재익", type: .User, id: 3),
                Element(name: "은식", type: .User, id: 4),
                Element(name: "JK", type: .User, id: 5)]
    }()
}
