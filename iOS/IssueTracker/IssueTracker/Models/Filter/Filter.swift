//
//  Filter.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import Foundation

struct Filter: Hashable {
    static func == (lhs: Filter, rhs: Filter) -> Bool {
        return lhs.element == rhs.element
            && lhs.checkable == rhs.checkable
    }
    
    enum ModelType {
        case user, label, milestone
    }
    
    enum Category: CaseIterable {
        case condition, detail
    }
    
    enum Element: String, CaseIterable {
        case openIssues = "열린 이슈들"
        case selfWrite = "내가 작성한 이슈들"
        case selfAssignee = "나한테 할당된 이슈들"
        case selfComment = "내가 댓글을 남긴 이슈들"
        case closedIssues = "닫힌 이슈들"
        case writer = "작성자"
        case label = "레이블"
        case milestone = "마일스톤"
        case assignee = "담당자"
        
        var category: Category {
            switch self {
            case .openIssues, .selfWrite, .selfAssignee, .selfComment, .closedIssues:
                return .condition
            case .writer, .label, .milestone, .assignee:
                return .detail
            }
        }
        
        var modelType: ModelType? {
            switch self {
            case .writer, .assignee:
                return .user
            case .label:
                return .label
            case .milestone:
                return .milestone
            default:
                return nil
            }
        }
    }
    
    let element: Element
    var category: Category {
        return element.category
    }
    
    var text: String {
        return element.rawValue
    }
    
    var checkable: Bool = false
}

extension Filter.Category: CustomStringConvertible {
    var description: String {
        switch self {
        case .condition:
            return "다음 중에 조건을 고르세요."
        case .detail:
            return "세부 조건"
        }
    }
    
    var filters: [Filter] {
        switch self {
        case .condition:
            return  [
                Filter(element: .openIssues),
                Filter(element: .selfWrite),
                Filter(element: .selfAssignee),
                Filter(element: .selfComment),
                Filter(element: .closedIssues)
            ]
        case .detail:
            return  [
                Filter(element: .writer),
                Filter(element: .label),
                Filter(element: .milestone),
                Filter(element: .assignee)
            ]
        }
    }
}


