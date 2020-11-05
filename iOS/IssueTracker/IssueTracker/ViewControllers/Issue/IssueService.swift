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
    func changeStatus(at indexPath: IndexPath)
    func filter(_ text: String)
}

protocol IssueServiceDelegate: AnyObject {
    func didDataLoaded(at indexPath: IndexPath?)
}
