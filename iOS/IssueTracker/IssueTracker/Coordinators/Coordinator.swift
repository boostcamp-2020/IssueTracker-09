//
//  Coordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

protocol Coordinator : AnyObject {
    var window: UIWindow { get }
    var childCoordinators: [String: ChildCoordinator] { get }

    func start()
}

protocol ChildCoordinator: Coordinator {
    init(window: UIWindow, parent: UIViewController)
}
