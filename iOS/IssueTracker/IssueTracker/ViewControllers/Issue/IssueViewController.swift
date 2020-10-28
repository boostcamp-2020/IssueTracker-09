//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class IssueViewController: UIViewController {
    @IBOutlet var tableView: UITableView!
    var delegate: NextCoordinatorDelegate?
    var service: IssueService?
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func setEditing(_ editing: Bool, animated: Bool) {
        super.setEditing(editing, animated: animated)
        tableView
            .visibleCells
            .compactMap { $0 as? IssueTableViewCell }
            .forEach { cell in
                UIView.animate(withDuration: 0.2) {
                    cell.checkBoxWrapper.isHidden = !editing
                }
            }
    }
    
    @IBAction func didEditButtonTapped(sender: UIBarButtonItem) {
        let editMode = !isEditing
        setEditing(editMode, animated: true)
        sender.title = editMode ? "Cancel" : "Edit"
    }
}

extension IssueViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}

extension IssueViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        service?.issues.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "cell") as? IssueTableViewCell,
              let issue = service?.issues[indexPath.row] else {
            return UITableViewCell()
        }
        cell.configure(issue: issue)
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
