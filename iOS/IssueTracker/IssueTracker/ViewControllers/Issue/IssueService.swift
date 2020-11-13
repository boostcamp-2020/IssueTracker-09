//
//  IssueService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

protocol IssueService {
    func issue(at indexPath: IndexPath, isFiltering: Bool) -> Issue
    func count(isFiltering: Bool) -> Int
    func reloadData()
    func changeStatus(at index: Int)
    func changeStatus(at indices: [Int], to: Bool)
    func filter(_ text: String?)
}

protocol IssueServiceDelegate: AnyObject {
    func didDataLoaded(at indexPath: IndexPath?)
    func didErrorReceived(title: String, message: String, handler: (() -> Void)?)
}
