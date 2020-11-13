//
//  IssueCacheService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

extension Notification.Name {
    static let didFilterChangedNotification =
        Notification.Name(rawValue: "IssueCacheService.didFilterChangedNotification")
}

class IssueCacheService: IssueService {
    private var issues = [Issue]()
    private var filteredIssues = [Issue]()
    private var networkService = IssueNetworkService()
    private weak var delegate: IssueServiceDelegate?
    
    init(delegate: IssueServiceDelegate?) {
        self.delegate = delegate
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(didFilterChanged),
                                               name: .didFilterChangedNotification,
                                               object: nil)
    }
    
    func issue(at indexPath: IndexPath, isFiltering: Bool) -> Issue {
        return isFiltering ? filteredIssues[indexPath.item] : issues[indexPath.item]
    }
    
    func count(isFiltering: Bool) -> Int {
        return isFiltering ? filteredIssues.count : issues.count
    }
    
    func changeStatus(at index: Int) {
        changeStatus(at: index, to: !issues[index].isOpened)
    }
    
    func changeStatus(at index: Int, to status: Bool) {
        let issue = issues[index]
        networkService.modifyIssueStatus(of: issue, to: status) { [weak self] result in
            switch result {
            case .success(let response):
                guard response else {
                    self?.delegate?.didErrorReceived(title: "상태 변경 실패", message: "잠시후 다시 시도하세요", handler: nil)
                    return
                }
                self?.issues[index].isOpened.toggle()
                self?.delegate?.didDataLoaded(at: nil)
            case .failure(let error):
                self?.delegate?.didErrorReceived(title: "상태 변경 실패", message: error.localizedDescription, handler: nil)
            }
        }
    }
    
    func changeStatus(at indices: [Int], to status: Bool) {
        indices
            .filter { self.issues[$0].isOpened }
            .forEach { changeStatus(at: $0, to: status) }
    }
    
    func reloadData() {
        networkService.fetchIssues(query: FilterContext.shared.query) { [weak self] result in
            switch result {
            case .success(let issues):
                self?.issues = issues.issues
                self?.delegate?.didDataLoaded(at: nil)
            case .failure(let error):
                self?.delegate?.didErrorReceived(title: "이슈 목록 조회 실패", message: error.localizedDescription) {
                    self?.reloadData()
                }
            }
        }
    }
    
    func filter(_ text: String? = nil) {
        if let text = text {
            filteredIssues = issues.filter { issue in
                return issue.title.lowercased().contains(text.lowercased())
            }
        }
    }
    
    @objc func didFilterChanged(_ notification: Notification) {
        reloadData()
    }
}
