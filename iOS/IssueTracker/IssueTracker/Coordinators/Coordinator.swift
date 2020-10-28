//
//  Coordinator.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

protocol Coordinator : AnyObject {
    func start()
}

protocol NextCoordinatorDelegate: AnyObject {
    func navigateToPage()
}
