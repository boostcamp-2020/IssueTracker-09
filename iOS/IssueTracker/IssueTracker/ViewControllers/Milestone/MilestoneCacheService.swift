//
//  MilestoneCacheService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation

class MilestoneCacheService: MilestoneService {
    private var milestones = [Milestone]()
    private var networkService = MilestoneNetworkService()
    private weak var delegate: MileStoneServiceDelegate?
    
    init(delegate: MileStoneServiceDelegate?) {
        self.delegate = delegate
//        reloadData()
    }
    
    subscript(at indexPath: IndexPath) -> Milestone {
        return milestones[indexPath.item]
    }
    
    var count: Int {
        return milestones.count
    }
    
    func reloadData() {
        networkService.fetchMilestones { [weak self] result in
            self?.milestones = (try? result.get().milestone) ?? []
            self?.delegate?.didDataLoaded()
        }
    }
}
