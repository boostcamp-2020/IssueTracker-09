//
//  CoordinatorManager.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import UIKit

enum CoordinatorName {
    case Sign
    case Issue
}

protocol CoordinatorDelegate: AnyObject {
    func start(name: CoordinatorName)
}

class CoordinatorManager {
    private var storage: [CoordinatorName: Coordinator] = [:]
    let window: UIWindow
    
    init(window: UIWindow) {
        self.window = window
    }
    
    private func coordinator(_ name: CoordinatorName) -> Coordinator {
        guard let coordinator = storage[name] else {
            let newCoordinator = make(name: name)
            storage[name] = newCoordinator
            return newCoordinator
        }
        return coordinator
    }
    // root ViewController
    // 생각해보자 나중에. ㅎ
    private func make(name: CoordinatorName) -> Coordinator {
        switch name {
        case .Sign:
            return SignCoordinator(window: window, delegate: self)
        case .Issue:
            return IssueCoordinator(window: window, delegate: self)
        }
    }
    
    func remove(name: CoordinatorName) {
        storage[name] = nil
    }
    
    func clear() {
        storage = [:]
    }
}

extension CoordinatorManager: CoordinatorDelegate {
    func start(name: CoordinatorName) {
        let coordinator = self.coordinator(name)
        coordinator.start()
    }
}
