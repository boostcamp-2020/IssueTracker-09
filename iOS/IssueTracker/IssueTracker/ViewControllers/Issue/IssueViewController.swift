//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class IssueViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func setEditing(_ editing: Bool, animated: Bool) {
        super.setEditing(editing, animated: animated)
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
        1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "cell") else {
            return UITableViewCell()
        }
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
