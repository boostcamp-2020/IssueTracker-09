//
//  SignCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import UIKit

protocol Coordinator : AnyObject {
    func start()
}

class SignCoordinator: Coordinator {
    private let storyboardName: String = "Main"
    private var window: UIWindow?
    
    init(window: UIWindow? = UIWindow()) {
        self.window = window
    }
    
    func start() {
        window?.makeKeyAndVisible()
        
        let storyBoard = UIStoryboard(name: storyboardName, bundle: nil)
        let viewController = storyBoard.instantiateViewController(identifier: "SignViewController") as? SignViewController
        window?.rootViewController = viewController
    }
    
//    private func navigationToPage() {
//
//    }
}
