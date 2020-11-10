//
//  AssigneeView.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import UIKit

class AssigneeView: UIView {
    @IBOutlet private weak var name: UILabel!
    @IBOutlet private weak var image: UIImageView!
    
    func configure(assignee: User) {
        if let url = assignee.image {
            image.fromURL(url)
        }
        name.text = assignee.name
    }
}
