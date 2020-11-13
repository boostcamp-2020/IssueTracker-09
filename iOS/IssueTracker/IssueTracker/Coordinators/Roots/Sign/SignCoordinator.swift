//
//  SignCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import UIKit

class SignCoordinator: Coordinator {
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: Coordinator] = [: ]
    
    private let storyboardName: String = "SignIn"
    private weak var delegate: RootCoordinateControllerDelegate?
    
    init(window: UIWindow, delegate: RootCoordinateControllerDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        let storyBoard = UIStoryboard(name: storyboardName, bundle: nil)
        let viewController = storyBoard.instantiateViewController(identifier: "SignViewController", creator: { coder in
            return SignViewController(coder: coder, request: GithubSignService.shared)
        })
        window.rootViewController = viewController
        window.makeKeyAndVisible()
        addObserver()
    }
}

extension SignCoordinator {
    func addObserver() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(didTokenRecieved),
                                               name: .succeededBySign, object: nil)
    }
    
    @objc func didTokenRecieved(notification: NSNotification) {
        guard let userInfo = notification.userInfo,
              let token = userInfo["token"] as? String else { return }
        
        if PersistenceManager.shared.save(token, forKey: .token) {
            delegate?.root(name: .issue)
        }
    }
}
