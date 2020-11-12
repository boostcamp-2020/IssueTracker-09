//
//  MilestoneService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation

protocol MilestoneService {
    subscript(at indexPath: IndexPath) -> Milestone { get }
    var count: Int { get }
    func reloadData()
}

protocol MileStoneServiceDelegate: AnyObject {
    func didDataLoaded()
}
