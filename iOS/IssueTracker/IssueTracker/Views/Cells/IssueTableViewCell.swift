//
//  IssueTableViewCell.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

class IssueTableViewCell: UITableViewCell {
    @IBOutlet weak var checkBoxWrapper: UIView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var badgeStackView: UIStackView!
    
    @IBOutlet weak var wrapperStackView: UIStackView!
}
