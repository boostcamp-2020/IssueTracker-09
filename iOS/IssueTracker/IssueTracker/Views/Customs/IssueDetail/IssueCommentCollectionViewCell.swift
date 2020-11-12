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
    @IBOutlet weak var content: UILabel!
    
    
    func configure(user: User, comment: Comment) {
        if let url = user.image {
            profile.fromURL(url)
        }
        name.text = user.name
        date.text = comment.timestamp
        content.text = comment.content
        //        markdown.subviews.forEach { view in
        //            view.removeFromSuperview()
        //        }
        //        markdown.load(markdown: comment.content)
        //        self.contentView.translatesAutoresizingMaskIntoConstraints = false
        //        // called when rendering finished
        //        markdown.onRendered = { [weak self] height in
        //            self?.contentView.heightAnchor.constraint(equalToConstant: height).isActive = true
        //            self?.setNeedsLayout()
        //        }
    }
}
