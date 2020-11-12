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
    var handler: (() -> Void)?
    
    
    func configure(user: User, comment: Comment) {
        if let url = user.image {
            profile.fromURL(url)
        }
        name.text = user.name
        date.text = self.date(comment.timestamp)
        content.text = comment.content
        
    }
    
    
    private func date(_ dateString: String) -> String {
        let dateString:String = "2018-05-13 15:05:40"
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
        
        guard let date = dateFormatter.date(from: dateString) else {
            return dateString
        }
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"

        return dateFormatter.string(from: date)
    }
    
    @IBAction func touchedMoreButton(_ sender: Any) {
        guard let handler = handler else { return }
        handler()
    }
}
