//
//  IssueTableViewCell.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

protocol IssueCellDelegate: AnyObject {
    func checked(_ cell: IssueTableViewCell)
}

class IssueTableViewCell: UITableViewCell {
    @IBOutlet weak var checkBoxWrapper: SelectButton!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var badgeStackView: UIStackView!
    @IBOutlet weak var wrapperStackView: UIStackView!
    weak var delegate: IssueCellDelegate?
    
    
    func configure(issue: Issue, isCheck: Bool) {
        titleLabel.text = issue.title
        descriptionLabel.text = issue.description
        checkBoxWrapper.button.isSelected = isCheck
    }
    
    @IBAction func toucedCheck(_ sender: Any) {
        delegate?.checked(self)
    }
}
