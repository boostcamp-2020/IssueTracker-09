//
//  Filter.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import Foundation

struct Filter: Hashable {
    static func == (lhs: Filter, rhs: Filter) -> Bool {
        return lhs.text == rhs.text
            && lhs.checkable == rhs.checkable
            && lhs.category == rhs.category
    }
    
    enum Category: CaseIterable {
        case condition, detail
    }
    
    let text: String
    let category: Category
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
                Filter(text: "열린 이슈들", category: self),
                Filter(text: "내가 작성한 이슈들", category: self),
                Filter(text: "나한테 할당된 이슈들", category: self),
                Filter(text: "내가 댓글을 남긴 이슈들", category: self),
                Filter(text: "닫힌 이슈들", category: self)
            ]
        case .detail:
            return  [
                Filter(text: "작성자", category: self),
                Filter(text: "레이블", category: self),
                Filter(text: "마일스톤", category: self),
                Filter(text: "담당자", category: self)
            ]
        }
    }
}


