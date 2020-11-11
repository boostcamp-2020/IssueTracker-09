//
//  File.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/11.
//

import UIKit

class AssigneeCell: UICollectionViewCell {
    @IBOutlet private weak var profile: UIImageView!
    @IBOutlet private weak var name: UILabel!
    
    func configure(assignee: User) {
        if let url = assignee.image {
            profile.fromURL(url)
        }
        name.text = assignee.name
    }
}
