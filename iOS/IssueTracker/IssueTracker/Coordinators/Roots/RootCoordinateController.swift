//
//  CoordinatorManager.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import UIKit

enum RootCoordinatorName {
    case sign
    case issue
}

protocol RootCoordinateControllerDelegate: AnyObject {
    func root(name: RootCoordinatorName)
}

class RootCoordinateController {
    let window: UIWindow
    var coordinator: Coordinator?
    
    init(window: UIWindow) {
        self.window = window
    }
    
    private func make(name: RootCoordinatorName) -> Coordinator {
        switch name {
        case .sign:
            return SignCoordinator(window: window, delegate: self)
        case .issue:
            return MainTabBarCoordinator(window: window, delegate: self)
        }
    }
}

extension RootCoordinateController: RootCoordinateControllerDelegate {
    func root(name: RootCoordinatorName) {
        coordinator = self.make(name: name)
        coordinator?.start()
    }
}
