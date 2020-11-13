//
//  LabelCollectionViewCell.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/12.
//

import UIKit

class LabelCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var label: BadgeView!
    @IBOutlet weak var content: UILabel!
    
    func configure(label: Label) {
        self.label.text = label.title
        let color = UIColor(hexString: label.color)
        self.label.layer.borderColor = color?.cgColor
        self.label.textColor = color
        
        content.text = label.content
    }
}
