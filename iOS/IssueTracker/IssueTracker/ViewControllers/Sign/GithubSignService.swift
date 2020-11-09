//
//  GithubSignCotroller.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/28.
//

import Foundation
import Alamofire

protocol AuthorizationRequestable {
    func requestCode()
}

class GithubSignService: AuthorizationRequestable {
    static let shared = GithubSignService()
    private let client_id = "2edb801e4c9525f90d37"
    private let client_secret = "db7be4b8c52fe7279086fab14c071bcd7e100c1c"
    
    private init() {}
    
    // signviewcontroller 실행 함수
    func requestCode() {
        //        let scope = "repo,user"
        let scope = "user:email"
        let urlString = "https://github.com/login/oauth/authorize?client_id=\(client_id)&scope=\(scope)"
        if let url = URL(string: urlString), UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url)
            // redirect to scene(_:openURLContexts:) if user authorized
        }
    }
    
    // scene delegate redirect function
    func requestAccessToken(with code: String) {
        let url = "https://github.com/login/oauth/access_token"
        
        let parameters = ["client_id": client_id,
                          "client_secret": client_secret,
                          "code": code]
        
        let headers: HTTPHeaders = ["Accept": "application/json"]
        
        AF.request(url, method: .post, parameters: parameters, headers: headers).responseJSON { (response) in
            switch response.result {
            case let .success(json):
                if let dic = json as? [String: String] {
                    let accessToken = dic["access_token"] ?? ""
                    self.getUser(token: accessToken)
                }
            case let .failure(error):
                print(error)
            }
        }
    }
    
    func getUser(token: String) {
        let url = "https://api.github.com/user"
        let headers: HTTPHeaders = ["Accept": "application/vnd.github.v3+json",
                                    "Authorization": "token \(token)"]
        AF.request(url, method: .get, parameters: [:], headers: headers).responseJSON(completionHandler: { (response) in
            switch response.result {
            case .success(let value):
                if let jsonObj = value as? Dictionary<String, Any>
                {
                    guard let name =  jsonObj["login"] as? String,
                          let id = jsonObj["id"] as? Int,
                          let image = jsonObj["avatar_url"] as? String else {
                        return
                    }
                    UserNetworkService().login(endPoint: .github, code: String(id), name: name, image: image)
                }
            case .failure(let error):
                print(error.localizedDescription)
            }
        })
    }
}


extension Notification.Name {
    static let succeededBySign = Notification.Name(rawValue: "succeededBySign")
}
