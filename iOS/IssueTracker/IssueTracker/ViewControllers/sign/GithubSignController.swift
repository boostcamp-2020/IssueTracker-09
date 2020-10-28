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

class GithubSignController: AuthorizationRequestable {
    static let shared = GithubSignController()
    private let client_id = "2edb801e4c9525f90d37"
    private let client_secret = "db7be4b8c52fe7279086fab14c071bcd7e100c1c"
    
    private init() {}
    
    func requestCode() {
        let scope = "repo,user"
        let urlString = "https://github.com/login/oauth/authorize?client_id=\(client_id)&scope=\(scope)"
        if let url = URL(string: urlString), UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url)
            // redirect to scene(_:openURLContexts:) if user authorized
        }
    }
    
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
                    print(accessToken)
                    
                    self.getUser(token: accessToken)
                    //                    KeychainSwift().set(accessToken, forKey: "accessToken")
                    // accessToken 저장, keychainSwift를 사용하든 userdefault로 만들든
                }
            case let .failure(error):
                print(error)
            }
        }
    }
    
    func getUser(token: String) {
        let url = "https://api.github.com/user"
        //            let accessToken = KeychainSwift().get("accessToken") ?? ""
        let headers: HTTPHeaders = ["Accept": "application/vnd.github.v3+json",
                                    "Authorization": "token \(token)"]
        
        AF.request(url, method: .get, parameters: [:], headers: headers).responseJSON(completionHandler: { (response) in
            switch response.result {
            case .success(let json):
                print(json as! [String: Any])
            case .failure:
                print("")
            }
        })
    }
    
    func logout() {
        //        KeychainSwift().clear()
    }
}
