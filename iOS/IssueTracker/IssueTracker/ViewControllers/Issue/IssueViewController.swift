//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

protocol IssueCoordinatorDelegate: AnyObject {
    func presentToFilterView()
}

class IssueViewController: UIViewController {
    @IBOutlet var tableView: IssueTableView!
    var delegate: IssueCoordinatorDelegate?
    var service: IssueService?
    var checks: [Bool] = []
    let barButtonController = BarButtonController()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        checks = Array(repeating: false, count: service?.count ?? 0)
        
        barButtonController.addTarget(option: .selectAll, target: self, action: #selector(touchedSelectButton))
        barButtonController.addTarget(option: .deselectAll, target: self, action: #selector(touchedDeselectButton))
        barButtonController.addTarget(option: .filter, target: self, action: #selector(touchedFilterButton))
    
        self.navigationItem.leftBarButtonItem = barButtonController.buttons[.filter]
    }
    
    override func setEditing(_ editing: Bool, animated: Bool) {
        super.setEditing(editing, animated: animated)
        
        tableView.applyAll(animated: true) { cell in
            cell.checkBoxWrapper.isHidden = !editing
        }
        
        if editing {
            self.navigationItem.setLeftBarButton(barButtonController.buttons[.selectAll], animated: true)
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
        print("touchedFilter")
        delegate?.presentToFilterView()
    }
    
    @objc func touchedDeselectButton(_ sender: Any) {
        tableView.applyAll(animated: true) { cell in
            cell.checkBoxWrapper.button.isSelected = false
        }
        checks = Array(repeating: false, count: service?.count ?? 0)
        self.navigationItem.leftBarButtonItem = barButtonController.buttons[.selectAll]
    }
    
    @objc func touchedSelectButton(_ sender: Any) {
        tableView.applyAll(animated: true) { cell in
            cell.checkBoxWrapper.button.isSelected = true
        }
        checks = Array(repeating: true, count: service?.count ?? 0)
        self.navigationItem.leftBarButtonItem = barButtonController.buttons[.deselectAll]
    }
}


extension IssueViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        service?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "cell") as? IssueTableViewCell,
              let issue = service?[indexPath.row] else {
            return UITableViewCell()
        }
        cell.delegate = self
        cell.configure(issue: issue, isCheck: checks[indexPath.item])
        cell.checkBoxWrapper.isHidden = !isEditing
        
        return cell
    }
    
    // https://zetal.tistory.com/entry/UIContextualAction
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let close = UIContextualAction(style: .normal, title: "Close") { action, view, completion in
            completion(true)
        }
        
        let delete = UIContextualAction(style: .destructive, title: "Delete") { action, view, completion in
            // self?.langs.remove(at: indexPath.row)
            // tableView.deleteRows(at: [indexPath], with: UITableViewRowAnimation.automatic)
            completion(true)
        }
        return UISwipeActionsConfiguration(actions: [delete, close])
    }
}

extension IssueViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
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
