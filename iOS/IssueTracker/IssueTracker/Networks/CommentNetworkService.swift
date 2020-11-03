//
//  CommentNetworkService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation
import Alamofire

class CommentNetworkService: NetworkService {
    enum Endpoint: String {
        case comment = "/comment"
    }
    
    func addComment(issue: Issue, content: String, completion handler: ( (Result<Data?, AFError>) -> Void)?) {
        guard let url = URL(string: baseURL + Endpoint.comment.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = [
            "content": content,
            "issueId": issue.id
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
    
    func fetchComments(issue:Issue, completion handler: @escaping (Result<Comments, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.comment.rawValue + "?issueId=\(issue.id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .get,
                   headers: headers)
            .validate()
            .responseDecodable(of: Comments.self) { response in
                handler(response.result)
            }
    }
    
    func deleteComment(comment: Comment, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.comment.rawValue + "/\(comment.id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .delete,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func modifyComment(comment: Comment, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.comment.rawValue + "/\(comment.id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = ["content": comment.content]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
}
