//
//  IssueTableView.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import UIKit

class IssueTableView: UITableView {
    
    
    func applyAll(animated: Bool, body: @escaping (IssueTableViewCell) -> ()) {
        self.visibleCells
            .compactMap{ $0 as? IssueTableViewCell }
            .forEach { cell in
                if animated {
                    UIView.animate(withDuration: 0.2) {
                        body(cell)
                    }
                } else {
                    body(cell)
                }
            }
    }
}
