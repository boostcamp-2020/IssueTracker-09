//
//  IssueCacheService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

class IssueCacheService: IssueService {
    private var issues = [Issue]()
    private var filteredIssues = [Issue]()
    private var networkService = IssueNetworkService()
    private weak var delegate: IssueServiceDelegate?
    
    init(delegate: IssueServiceDelegate?) {
        self.delegate = delegate
    }
    
    func issue(at indexPath: IndexPath, isFiltering: Bool) -> Issue {
        return isFiltering ? filteredIssues[indexPath.item] : issues[indexPath.item]
    }
    
    func count(isFiltering: Bool) -> Int {
        return isFiltering ? filteredIssues.count : issues.count
    }
    
    func changeStatus(at indexPath: IndexPath) {
        networkService.modifyIssueStatus(of: issues[indexPath.item]) { [weak self] result in
            if let result = try? result.get(), result {
                self?.delegate?.didDataLoaded(at: indexPath)
            }
        }
    }
    func reloadData() {
        networkService.fetchIssues { [weak self] result in
            self?.issues = (try? result.get().issues) ?? []
            self?.delegate?.didDataLoaded(at: nil)
        }
    }
    
    func filter(_ text: String) {
        filteredIssues = issues.filter { issue in
            return issue.title.lowercased().contains(text.lowercased())
        }
    }
}
