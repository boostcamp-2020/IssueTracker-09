//
//  LocalIssueService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

class LocalIssueService: IssueService {
    private var _issues = [
        0: Issue(number: 0,
                 title: "레이블 목록 보기 구현",
                 description: "레이블 전체 목록을 볼 수 있어야 한다 2줄까지 보입니다.",
                 sprint: "",
                 labels: [""],
                 status: .opened)
    ]
    
    var issues: [Issue] {
        Array(_issues.values)
    }
    
    func insert(_ issue: Issue) {
        _issues[issue.number] = issue
    }
    
    func close(_ number: Int) {
        if let issue = _issues[number] {
            _issues[number] = Issue(number: issue.number, title: issue.title, description: issue.description, sprint: issue.sprint, labels: issue.labels, status: .closed)
        }
    }
    
    func delete(_ number: Int) {
        _issues[number] = nil
    }
}
