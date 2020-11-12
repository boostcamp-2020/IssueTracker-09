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
    private var bottomView: UIView?
    private var refreshControl: UIRefreshControl?
    
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
        addNotification()
        service?.reloadData()
        checks = Array(repeating: false, count: service?.count(isFiltering: isFiltering) ?? 0)
        
        barButtonController.addTarget(option: .selectAll, target: self, action: #selector(touchedSelectButton))
        barButtonController.addTarget(option: .deselectAll, target: self, action: #selector(touchedDeselectButton))
        barButtonController.addTarget(option: .filter, target: self, action: #selector(touchedFilterButton))
    
        self.navigationItem.leftBarButtonItem = barButtonController.buttons[.filter]
        configSearchController()
        configBottomButton()
        configRefreshControl()
    }
    
    func configRefreshControl() {
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(didRefreshChanged), for: .valueChanged)
        tableView.addSubview(refreshControl)
        self.refreshControl = refreshControl
    }
    
    func configBottomButton() {
        guard let tabbar = tabBarController?.tabBar else {
            return
        }
        let bottomView = UIView(frame: tabbar.frame)
        bottomView.backgroundColor = .systemGray6
        let button = UIButton()
        button.setTitle("선택 이슈 닫기", for: .normal)
        button.setTitleColor(.systemBlue, for: .normal)
        button.addTarget(self, action: #selector(didCloseButtonTapped), for: .touchUpInside)
        bottomView.addSubview(button)
        bottomView.isHidden = true
        button.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: bottomView.topAnchor, constant: 10),
            button.trailingAnchor.constraint(equalTo: bottomView.trailingAnchor, constant: -15)
        ])
        
        view.addSubview(bottomView)
        self.bottomView = bottomView
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
        
        tabBarController?.tabBar.isHidden = editing
        bottomView?.isHidden = !editing
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
    
    @objc func didCloseButtonTapped(_ sender: UIButton) {
        let checked = checks
            .enumerated()
            .filter { $0.element }
            .compactMap {
                $0.offset
            }
        service?.changeStatus(at: checked, to: false)
    }
    
    @objc func didRefreshChanged(_ sender: UIRefreshControl) {
        service?.reloadData()
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
    func tableView(_ tableView: UITableView,
                   trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let issue = service?.issue(at: indexPath, isFiltering: isFiltering)
        let isOpened = issue?.isOpened
        
        let close = UIContextualAction(style: .normal,
                                       title: (isOpened ?? true) ? "Close" : "Open") {
            [weak self] action, view, completion in
            self?.service?.changeStatus(at: indexPath.item)
            completion(true)
        }
        
        return UISwipeActionsConfiguration(actions: [close])
    }
}

extension IssueViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if isEditing {
            checks[indexPath.item].toggle()
            let cell = tableView.cellForRow(at: indexPath) as? IssueTableViewCell
            cell?.checkBoxWrapper.button.isSelected.toggle()
        } else {
            guard let issue = service?.issue(at: indexPath, isFiltering: isFiltering) else {
                return
            }
            delegate?.navigationToIssueDetail(issue: issue)
        }
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
        if let indexPath = indexPath {
            tableView.reloadRows(at: [indexPath], with: .automatic)
        } else {
            tableView.reloadData()
        }
        
        refreshControl?.endRefreshing()
        
        checks = Array(repeating: false, count: service?.count(isFiltering: isFiltering) ?? 0)
    }
    
    func didErrorReceived(title: String, message: String, handler: (() -> Void)? = nil) {
        let alert = AlertControllerFactory.shared.makeSimpleAlert(title: title, message: message) {_ in
            handler?()
        }
        present(alert, animated: true, completion: nil)
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

extension IssueViewController {
    func addNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(willResumeView), name: .resumeIssueList, object: nil)
    }
    
    @objc func willResumeView() {
        service?.reloadData()
    }
}
