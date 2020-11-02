//
//  LabelNetworkService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation
import Alamofire

class LabelNetworkService: NetworkService {
    enum Endpoint: String {
        case label = "/label"
    }
    
    func addLabel(color: UIColor, title: String, content: String, completion handler: @escaping (Result<Label, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.label.rawValue) else {
            return
        }
        
        let parameters = ["color": color.toHexString(), "title": title, "content": content]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .post,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseDecodable(of: Label.self) { response in
                handler(response.result)
            }
    }
    
    func fetchLabels(completion handler: @escaping (Result<Labels, AFError>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.label.rawValue) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .get,
                   headers: headers)
            .validate()
            .responseDecodable(of: Labels.self) { response in
                handler(response.result)
            }
    }
    
    func modifyLabel(to label: Label) {
        guard let url = URL(string: baseURL + Endpoint.label.rawValue + "/\(label.id)") else {
            return
        }
        
        let parameters = ["color": label.color, "title": label.title, "content": label.content]
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .put,
                   parameters: parameters,
                   headers: headers)
            .validate()
            .responseString { response in
                
            }
    }
    
    func deleteLabel(id: Int) {
        guard let url = URL(string: baseURL + Endpoint.label.rawValue + "/\(id)") else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.request(url,
                   method: .delete,
                   headers: headers)
            .validate()
            .responseString { response in
                
            }
    }
}
