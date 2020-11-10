//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class IssueViewController: UIViewController {
    typealias IssueCoordinatorDelegate = IssueNavigationDelegate & IssuePresentDelegate
    @IBOutlet private var tableView: IssueTableView!
    
    private weak var delegate: IssueCoordinatorDelegate?
    private let barButtonController = BarButtonController()
    private let searchController = UISearchController(searchResultsController: nil)
    private var checks: [Bool] = [] {
        didSet {
            if isEditing {
                setLeftBarButton()
            }
        }
    }
    var service: IssueService?
    
    init?(coder: NSCoder, delegate: IssueCoordinatorDelegate) {
        self.delegate = delegate
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    func setLeftBarButton() {
        let isAllTrue = checks.allSatisfy({ $0 == true })
        self.navigationItem.leftBarButtonItem = barButtonController.buttons[isAllTrue ? .deselectAll : .selectAll]
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        service?.reloadData()
        checks = Array(repeating: false, count: service?.count(isFiltering: isFiltering) ?? 0)
        
        barButtonController.addTarget(option: .selectAll, target: self, action: #selector(touchedSelectButton))
        barButtonController.addTarget(option: .deselectAll, target: self, action: #selector(touchedDeselectButton))
        barButtonController.addTarget(option: .filter, target: self, action: #selector(touchedFilterButton))
    
        self.navigationItem.leftBarButtonItem = barButtonController.buttons[.filter]
        configSearchController()
    }
    
    func configSearchController() {
        searchController.searchResultsUpdater = self
        searchController.obscuresBackgroundDuringPresentation = false
        searchController.searchBar.placeholder = "이슈 검색"
        navigationItem.searchController = searchController
        definesPresentationContext = true
    }
    
    var searchBarIsEmpty: Bool {
        // Returns true if the text is empty or nil
        return searchController.searchBar.text?.isEmpty ?? true
    }
    
    var isFiltering: Bool {
        return searchController.isActive && !searchBarIsEmpty
    }
    
    override func setEditing(_ editing: Bool, animated: Bool) {
        super.setEditing(editing, animated: animated)
        
        tableView.applyAll(animated: true) { cell in
            cell.checkBoxWrapper.isHidden = !editing
        }
        
        if editing {
            setLeftBarButton()
        } else {
            self.navigationItem.setLeftBarButton(barButtonController.buttons[.filter], animated: true)
        }
    }
    
    private func createBarItem(name: String) -> UIBarButtonItem {
        let button = UIButton()
        button.setTitle(name, for: .normal)
        button.setTitleColor(UIColor.systemBlue, for: .normal)
        let item = UIBarButtonItem(customView: button)
        return item
    }
    
    @IBAction func didEditButtonTapped(sender: UIBarButtonItem) {
        let editMode = !isEditing
        setEditing(editMode, animated: true)
        sender.title = editMode ? "취소" : "편집"
    }
    
    @objc func touchedFilterButton(_ sender: Any) {
        delegate?.presentToFilter()
    }
    
    @objc func touchedDeselectButton(_ sender: Any) {
        tableView.applyAll(animated: true) { cell in
            cell.checkBoxWrapper.button.isSelected = false
        }
        checks = Array(repeating: false, count: service?.count(isFiltering: isFiltering) ?? 0)
    }
    
    @objc func touchedSelectButton(_ sender: Any) {
        tableView.applyAll(animated: true) { cell in
            cell.checkBoxWrapper.button.isSelected = true
        }
        checks = Array(repeating: true, count: service?.count(isFiltering: isFiltering) ?? 0)
    }
    @IBAction func touchedAppendButton(_ sender: Any) {
        delegate?.presentToNew()
    }
}


extension IssueViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        service?.count(isFiltering: isFiltering) ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "cell") as? IssueTableViewCell,
              let issue = service?.issue(at: indexPath, isFiltering: isFiltering) else {
            return UITableViewCell()
        }
        cell.delegate = self
        cell.configure(issue: issue, isCheck: checks[indexPath.item])
        cell.checkBoxWrapper.isHidden = !isEditing
        
        return cell
    }
    
    // https://zetal.tistory.com/entry/UIContextualAction
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let close = UIContextualAction(style: .normal, title: "Close") { [weak self] action, view, completion in
            self?.service?.changeStatus(at: indexPath)
            completion(true)
        }
        
        return UISwipeActionsConfiguration(actions: [close])
    }
}

extension IssueViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        guard let issue = service?.issue(at: indexPath, isFiltering: isFiltering) else {
            return
        }
        delegate?.navigationToIssueDetail(issue: issue)
    }
}


extension IssueViewController: IssueCellDelegate {
    func checked(_ cell: IssueTableViewCell) {
        guard let index = self.tableView.indexPath(for: cell) else {
            return
        }
        
        checks[index.item] = !checks[index.item]
    }
}

extension IssueViewController: IssueServiceDelegate {
    func didDataLoaded(at indexPath: IndexPath?) {
        // TODO: - indexPath에 따른 처리 필요
        tableView.reloadData()
        // 데이터가 바뀌었을 때는 어떻게 해야 할까?
        checks = Array(repeating: false, count: service?.count(isFiltering: isFiltering) ?? 0)
    }
}

extension IssueViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        guard let text = searchController.searchBar.text else {
            return
        }
        
        service?.filter(text)
        tableView.reloadData()
    }
}
