//
//  MilestoneNetworkService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation
import Alamofire

class MilestoneNetworkService: NetworkService {
    enum Endpoint: String {
        case milestone = "/milestone"
    }
    
    func addMilestone(_ milestone: Milestone, completion handler: @escaping (Result<Milestone, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.milestone.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = [
            "title": milestone.title,
            "content": milestone.content,
            "deadline": milestone.deadline
        ]
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .post,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseDecodable(of: Milestone.self) { response in
                handler(response.result)
            }
    }
    
    func fetchMilestones(completion handler: @escaping (Result<Milestones, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.milestone.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .get,
                   headers: headers)
            .validate()
            .responseDecodable(of: Milestones.self) { response in
                handler(response.result)
            }
    }
    
    func modifyMilestone(_ milestone: Milestone, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.milestone.rawValue + "/\(milestone.id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = [
            "title": milestone.title,
            "content": milestone.content,
            "deadline": milestone.deadline
        ]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func modifyMilestoneState(_ milestone: Milestone, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.milestone.rawValue + "/\(milestone.id)"),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let parameters = [
            "isOpened": !milestone.isOpened
        ]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseBool(completionHandler: handler)
    }
    
    func deleteMilestone(_ milestone: Milestone, completion handler: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.milestone.rawValue + "/\(milestone.id)"),
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
}
