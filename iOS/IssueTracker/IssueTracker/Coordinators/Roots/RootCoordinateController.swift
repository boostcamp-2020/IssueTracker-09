//
//  CoordinatorManager.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import UIKit

enum RootCoordinatorName {
    case Sign
    case Issue
}

protocol RootCoordinateControllerDelegate: AnyObject {
    func root(name: RootCoordinatorName)
}

class RootCoordinateController {
    let window: UIWindow
    
    init(window: UIWindow) {
        self.window = window
    }
    
    private func make(name: RootCoordinatorName) -> Coordinator {
        switch name {
        case .Sign:
            return SignCoordinator(window: window, delegate: self)
        case .Issue:
            return MainTabBarCoordinator(window: window, delegate: self)
        }
    }
}

extension RootCoordinateController: RootCoordinateControllerDelegate {
    func root(name: RootCoordinatorName) {
        let coordinator = self.make(name: name)
        coordinator.start()
    }
}
