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
        case milestone = "/milestone"
        case title = "/title"
        case state = "/state"
        case labels = "/labels"
        case assignees = "/assignees"
    }
    
    func addIssue(issue: Issue, completion handler: ( (Result<Data?, AFError>) -> Void)?) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        // TODO 없는 경우에도 추가할 수 있도록 수정
        guard let labelId = issue.labels?.compactMap({ $0.id }),
              let assigneeId = issue.assignees?.compactMap({ $0.id }),
              let milestoneId = issue.milestoneID else {
            return
        }
        
        let parameters = [
            "title": issue.title,
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
            .response { response in
                handler?(response.result)
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
    
    func modifyIssueTitle(of id: Int, to title: String, completion handler: @escaping (Result<Bool, Error>) -> Void) {
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
            .responseBool(completionHandler: handler)
    }
    
    func modifyIssueMilestone(of id: Int, to milestone: Milestone, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.milestone.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["milestoneId": milestone.id]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func modifyIssueStatus(of issue: Issue, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.state.rawValue + "/\(issue.id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["isOpened": !issue.isOpened]

        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func modifyIssueLabels(of id: Int, checked: [Label], unchecked: [Label], completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.labels.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["checked": checked.map { $0.id }, "unchecked": unchecked.map { $0.id }]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func modifyIssueAssignee(of id: Int, checked: [User], unchecked: [User], completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.assignees.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["checked": checked.map { $0.id }, "unchecked": unchecked.map { $0.id }]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
}
