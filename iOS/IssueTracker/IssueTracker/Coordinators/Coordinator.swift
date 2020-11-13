//
//  Coordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

protocol Coordinator: AnyObject {
    var window: UIWindow { get }
    var childCoordinators: [String: Coordinator] { get }

    func start()
}
