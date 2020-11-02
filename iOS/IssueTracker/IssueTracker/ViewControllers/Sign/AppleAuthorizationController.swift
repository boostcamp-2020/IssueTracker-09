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
            let id = appleIDCredential.user
            if let name = appleIDCredential.fullName?.givenName {
                PersistenceManager.shared.save(name, forKey: .name)
            }

            guard let name = PersistenceManager.shared.load(forKey: .name) else { return }
            let service = UserNetworkService(endPoint: .apple)
            service.post(code: id, name: name)
            
        default:
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
