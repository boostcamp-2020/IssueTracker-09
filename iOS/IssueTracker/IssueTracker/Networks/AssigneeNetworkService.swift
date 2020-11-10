//
//  AssigneeNetworkService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import Foundation
import Alamofire

class AssigneeNetworkService: NetworkService {
    enum Endpoint: String {
        case users = "/user/users"
    }
    
    func fetchAssignee(completion handler: @escaping (Result<Assignees, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.users.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .get,
                   headers: headers)
            .validate()
            .responseDecodable(of: Assignees.self) { response in
                handler(response.result)
            }
    }
}

