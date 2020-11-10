//
//  UserService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import Foundation
import Alamofire

class UserNetworkService: NetworkService {
    enum Endpoint: String {
        case github = "/user/github/ios"
        case apple = "/user/apple"
        case users = "/user/users"
    }
    
    private func url(endPoint: Endpoint) -> URL? {
        let base = baseURL + endPoint.rawValue
        return URL(string: base)
    }
    
    func login(endPoint: Endpoint, code: String, name: String, image: String = "https://avatars2.githubusercontent.com/u/46195613?v=4") {
        guard let url = url(endPoint: endPoint) else { return }
        let params: [String: String] = [ "code": code,
                                         "name": name,
                                         "image": image ]
        
        AF.request(url, method: .post, parameters: params)
            .validate()
            .responseJSON { response in
            switch response.result {
            case .success(let value):
                guard let dic = value as? [String: Any],
                      let token = dic["token"] as? String else { return }
                
                NotificationCenter.default.post(name: .succeededBySign, object: nil, userInfo: ["token": token])
            //통신실패
            case .failure(let error):
                print("error: \(String(describing: error.errorDescription))")
            }
        }
    }
    
    func fetchAssignees(completion handler: @escaping (Result<Assignees, AFError>) -> Void) {
        guard let url = url(endPoint: .users),
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

