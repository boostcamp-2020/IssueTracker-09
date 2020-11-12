//
//  LabelCell.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/11.
//

import UIKit

class LabelCell: UICollectionViewCell {
    @IBOutlet weak var label: BadgeView!
    
    func configure(label: Label) {
        self.label.text = label.title
        let color = UIColor(hexString: label.color)
        self.label.layer.borderColor = color?.cgColor
        self.label.textColor = color
    }
}
