//
//  IssueCacheService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

class IssueCacheService: IssueService {
    func changeStatus(at indexPath: IndexPath) {
        networkService.modifyIssueStatus(of: issues[indexPath.item]) { [weak self] result in
            if let result = try? result.get(), result {
                self?.delegate?.didDataLoaded(at: indexPath)
            }
        }
    }
    
    private var issues = [Issue]()
    private var networkService = IssueNetworkService()
    private weak var delegate: IssueServiceDelegate?
    
    init(delegate: IssueServiceDelegate?) {
        self.delegate = delegate
    }
    
    subscript(at indexPath: IndexPath) -> Issue {
        return issues[indexPath.item]
    }
    
    var count: Int {
        return issues.count
    }
    
    func reloadData() {
        networkService.fetchIssues { [weak self] result in
            self?.issues = (try? result.get().issues) ?? []
            self?.delegate?.didDataLoaded(at: nil)
        }
    }
}
