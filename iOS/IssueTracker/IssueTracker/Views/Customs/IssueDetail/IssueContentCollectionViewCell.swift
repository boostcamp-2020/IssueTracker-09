//
//  IssueDetailCollectionViewCell.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit

class IssueContentCollectionViewCell: UICollectionViewCell {
    @IBOutlet private weak var profile: UIImageView!
    @IBOutlet private weak var name: UILabel!
    @IBOutlet private weak var number: UILabel!
    @IBOutlet private weak var content: UILabel!
    @IBOutlet private weak var status: UIButton!
    
    func configure(issue: Issue) {
        if let url = issue.user.image {
            profile.fromURL(url: url)
        }
        name.text = issue.user.name
        number.text = "#\(issue.id)"
        content.text = issue.title
        if issue.isOpened {
            status.setTitle("Open", for: .normal)
        } else {
            status.setTitle("Close", for: .normal)
        }
    }
}
