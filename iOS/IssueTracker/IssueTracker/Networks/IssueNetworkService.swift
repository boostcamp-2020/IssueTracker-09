//
//  IssueNetworkService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation
import Alamofire

class IssueNetworkService: NetworkService {
    enum Endpoint: String {
        case issue = "/issue"
    }
    
    func addIssue(issue: Issue, completion handler: @escaping (Result<Issue, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let labelId = issue.label.map { $0.id }
        let assigneeId = issue.user.map { $0.id }
        guard let milestoneId = issue.milestone?.id else {
            return
        }
        
        let parameters = [
            "title": issue.title,
            "content": issue.content,
            "labelId": labelId,
            "assigneeId": assigneeId,
            "milestoneId": milestoneId
        ] as [String : Any]
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .post,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseDecodable(of: Issue.self) { response in
                handler(response.result)
            }
    }
    
    func fetchIssues(completion handler: @escaping (Result<Issues, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .get,
                   headers: headers)
            .validate()
            .responseDecodable(of: Issues.self) { response in
                handler(response.result)
            }
    }
    
    func modifyIssueTitle(of id: Int, to title: String) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["title": title]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
    }
    
    func modifyIssueMilestone(of id: Int, to milestone: Milestone) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["milestone": milestone.id]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
    }
    
    func modifyIssueStatus(of id: Int) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   headers: headers)
            .validate()
    }
    
    func modifyIssueAssignee(of id: Int, to assignee: User) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["assigneeId": assignee.id]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
    }
}
