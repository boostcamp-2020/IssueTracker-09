//
//  IssueService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

protocol IssueService {
    subscript(at indexPath: IndexPath) -> Issue { get }
    var count: Int { get }
    func reloadData()
}

protocol IssueServiceDelegate: AnyObject {
    func didDataLoaded()
}
