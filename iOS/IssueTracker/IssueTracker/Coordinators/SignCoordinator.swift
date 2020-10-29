//
//  SignCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import UIKit

class SignCoordinator: Coordinator {
    private let storyboardName: String = "SignIn"
    private let window: UIWindow
    private weak var delegate: CoordinatorDelegate?
    
    init(window: UIWindow, delegate: CoordinatorDelegate) {
        self.window = window
        self.delegate = delegate
    }
    
    func start() {
        
        let storyBoard = UIStoryboard(name: storyboardName, bundle: nil)
        let viewController = storyBoard.instantiateViewController(identifier: "SignViewController", creator: { coder in
            return SignViewController(coder: coder, delegate: self, request: GithubSignService.shared)
        })
        //        let viewController = storyBoard.instantiateViewController(identifier: "SignViewController") as? SignViewController
        window.rootViewController = viewController
        window.makeKeyAndVisible()
    }
}

extension SignCoordinator: NextCoordinatorDelegate {
    func navigateToPage() {
        delegate?.start(name: .Issue)
    }
}
