//
//  ASAuthorizationController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import Foundation
import AuthenticationServices

class AppleAuthorizationController: NSObject {
    let window: UIWindow
    
    init(window: UIWindow?) {
        if let window = window {
            self.window = window
        } else  {
            self.window = UIWindow()
            self.window.makeKeyAndVisible()
        }
    }
}

extension AppleAuthorizationController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
        case let appleIDCredential as ASAuthorizationAppleIDCredential:
            let userIdentifier = appleIDCredential.user
            let fullName = appleIDCredential.fullName
            let email = appleIDCredential.email
            
            print("ASAuthorizationAppleIDCredential")
            print("indenifier : \(userIdentifier)")
            print("name : \(String(describing: fullName))")
            print("mail : \(String(describing: email))")
            
        // TODO: - 다음 화면으로 이동
        case let passwordCredential as ASPasswordCredential:
            let username = passwordCredential.user
            let password = passwordCredential.password
            
            print("ASPasswordCredential")
            print("name : \(username)")
            print("password : \(password)")
            
            
            DispatchQueue.main.async {
                // TODO: - 다음 화면으로 이동
            }
        default:
            print("entry defaault")
            break
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print(error.localizedDescription)
        // Handle error.
    }
}

extension AppleAuthorizationController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return window
    }
}
