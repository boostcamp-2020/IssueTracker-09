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
//            self?.milestones = (try? result.get().milestone) ?? []
            let milestone1 = Milestone(id: 1, title: "milestone1", content: "첫번째 마일스톤", deadline: "2020.11.03", isOpened: true, openCount: 10, totalCount: 20)
            let milestone2 = Milestone(id: 2, title: "milestone2", content: "두번째 마일스톤", deadline: "2020.11.11", isOpened: true, openCount: 10, totalCount: 20)
            let milestone3 = Milestone(id: 3, title: "milestone3", content: "세번째 마일스톤", deadline: "2020.11.22", isOpened: true, openCount: 10, totalCount: 20)

            self?.milestones = [milestone1, milestone2, milestone3]
            self?.delegate?.didDataLoaded()
        }
    }
}
