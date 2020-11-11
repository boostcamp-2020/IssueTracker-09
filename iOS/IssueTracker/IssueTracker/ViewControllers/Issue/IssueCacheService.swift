//
//  IssueCacheService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import Foundation

extension Notification.Name {
    static let didFilterChangedNotification = Notification.Name(rawValue: "IssueCacheService.didFilterChangedNotification")
}

class IssueCacheService: IssueService {
    private var issues = [Issue]()
    private var filteredIssues = [Issue]()
    private var networkService = IssueNetworkService()
    private weak var delegate: IssueServiceDelegate?
    
    init(delegate: IssueServiceDelegate?) {
        self.delegate = delegate
        NotificationCenter.default.addObserver(self, selector: #selector(didFilterChanged), name: .didFilterChangedNotification, object: nil)
    }
    
    func issue(at indexPath: IndexPath, isFiltering: Bool) -> Issue {
        return isFiltering ? filteredIssues[indexPath.item] : issues[indexPath.item]
    }
    
    func count(isFiltering: Bool) -> Int {
        return isFiltering ? filteredIssues.count : issues.count
    }
    
    func changeStatus(at indexPath: IndexPath) {
        networkService.modifyIssueStatus(of: issues[indexPath.item]) { [weak self] result in
            switch result {
            case .success(let response):
                guard response, let isOpened = self?.issues[indexPath.item].isOpened else {
                    self?.delegate?.didErrorReceived(title: "상태 변경 실패", message: "잠시후 다시 시도하세요", handler: nil)
                    return
                }
                self?.issues[indexPath.item].isOpened = !isOpened
                self?.delegate?.didDataLoaded(at: indexPath)
            case .failure(let error):
                self?.delegate?.didErrorReceived(title: "상태 변경 실패", message: error.localizedDescription, handler: nil)
            }
        }
    }
    func reloadData() {
        networkService.fetchIssues { [weak self] result in
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
    
    func filter(_ text: String) {
        filteredIssues = issues.filter { issue in
            return issue.title.lowercased().contains(text.lowercased())
        }
    }
    
    @objc func didFilterChanged(_ notification: Notification) {
        // FilterContext를 이용하여 내용 필터링 하기
    }
}
