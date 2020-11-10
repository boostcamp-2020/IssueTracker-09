//
//  IssueCommentCollectionViewCell.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit

class IssueCommentCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var profile: UIImageView!
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var date: UILabel!
    @IBOutlet weak var comment: UILabel!
    
    func configure(user: User, comment: Comment) {
        if let url = user.image {
            profile.fromURL(url)
        }
        name.text = user.name
        date.text = comment.timestamp
        self.comment.text = comment.content
    }
}
