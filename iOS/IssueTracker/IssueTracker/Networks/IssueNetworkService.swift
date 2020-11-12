//
//  IssueNetworkService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation
import Alamofire

struct IssueFilterQuery {
    let isOpen: Bool?
    let author: String?
    let assignee: String?
    
    var rawValue: String? {
        var query = [String]()
        if let isOpen = isOpen {
            query += ["is:\(isOpen ? "open" : "close")"]
        }
        if let author = author {
            query += ["author:\(author)"]
        }
        if let assignee = assignee {
            query += ["assignee:\(assignee)"]
        }
        return query.isEmpty ? nil : "?q=" + query.joined(separator: " ")
    }
}

class IssueNetworkService: NetworkService {
    enum Endpoint: String {
        case issue = "/issue"
        case milestone = "/milestone"
        case title = "/title"
        case state = "/state"
        case labels = "/labels"
        case assignees = "/assignees"
    }
    
    func addIssue(title: String, labelId: [Int]?, assigneeId: [Int]?, milestoneId: Int?, completion handler: ( (Result<Issue, AFError>) -> Void)?) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        var parameters = [
            "title": title
        ] as [String : Any]
        
        if let labelId = labelId {
            parameters["labelId"] = labelId
        }
        
        if let assigneeId = assigneeId {
            parameters["assigneeId"] = assigneeId
        }
        
        if let milestoneId = milestoneId {
            parameters["milestoneId"] = milestoneId
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .post,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseDecodable(of: Issue.self) { response in
                handler?(response.result)
            }
    }
    
    func fetchIssues(query: IssueFilterQuery? = nil, completion handler: @escaping (Result<Issues, AFError>) -> Void) {
        var urlString = baseURL + Endpoint.issue.rawValue + (query?.rawValue ?? "")
        urlString = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        guard let url = URL(string: urlString),
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
    
    func modifyIssueStatus(of issue: Issue, to: Bool, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.state.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["isOpened": !issue.isOpened, "id": issue.id] as [String : Any]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate({ (request, response, data) -> DataRequest.ValidationResult in
                let statusCode = response.statusCode
                if (200..<300) ~= statusCode || 400 == statusCode {
                    return .success(())
                }
                return .failure(NetworkError.response)
            })
            .response { response in
                handler(.success(true))
            }
    }
    
    func modifyIssueLabels(of id: Int, checked: [Label], unchecked: [Label], completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.labels.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let encoder = URLEncodedFormParameterEncoder(encoder: URLEncodedFormEncoder(arrayEncoding: .noBrackets))
        let parameters = ["checked": checked.map { $0.id }, "unchecked": unchecked.map { $0.id }]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   encoder: encoder,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func modifyIssueAssignee(of id: Int, checked: [User], unchecked: [User], completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.issue.rawValue + Endpoint.assignees.rawValue + "/\(id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let encoder = URLEncodedFormParameterEncoder(encoder: URLEncodedFormEncoder(arrayEncoding: .noBrackets))
        let parameters = ["checked": checked.map { $0.id }, "unchecked": unchecked.map { $0.id }]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
    
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   encoder: encoder,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: { result in
                handler(result)
            })
    }
}
