//
//  LocalIssueService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

class LocalIssueService: IssueService {
    let issue = Issue(id: 0, title: "레이블 목록 보기 구현", isOpened: true, timestamp: "2020-11-03T12:20:25.000Z", assignees: [User(id: 1, name: "joojaewoo", image: "https://avatars2.githubusercontent.com/u/46195613?v=4")], milestone: nil, user: User(id: 1, name: "joojaewoo", image: "https://avatars2.githubusercontent.com/u/46195613?v=4"), labels: [Label(id: 2, color: "#975917", title: "test", content: "입력테스트")])
    
    internal lazy var issues = {
        return Issues(issue: [issue, issue, issue, issue, issue, issue, issue, issue, issue, issue, issue, issue])
    }()
    
    subscript(at: Int) -> Issue {
        get{
            issues.issue[at]
        }
    }
    
    func remove(indexOf: Int) {
        issues.issue.remove(at: indexOf)
    }
    
    var count: Int {
        return issues.issue.count
    }
    
//
//    var issues: [Issue] {
//        Array(_issues.values)
//    }
    
//    func insert(_ issue: Issue) {
//        _issues[issue.number] = issue
//    }
//    
//    func close(_ number: Int) {
//        if let issue = _issues[number] {
//            _issues[number] = Issue(number: issue.number, title: issue.title, description: issue.description, sprint: issue.sprint, labels: issue.labels, status: .closed)
//        }
//    }
//    
//    func delete(_ number: Int) {
//        _issues[number] = nil
//    }
}
