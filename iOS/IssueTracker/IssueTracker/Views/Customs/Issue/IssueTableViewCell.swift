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
    @IBOutlet weak var badgeStackView: UIStackView!
    @IBOutlet weak var wrapperStackView: UIStackView!
    weak var delegate: IssueCellDelegate?
    
    override func prepareForReuse() {
        titleLabel.text = ""
        badgeStackView.clear()
    }
    
    func configure(issue: Issue, isCheck: Bool) {
        titleLabel.text = issue.title
        if let title = issue.milestone?.title {
            badgeStackView.addArrangedSubview(makeBadgeView(content: title, color: .systemGray))
        }
        
        issue.labels.forEach { label in
            badgeStackView.addArrangedSubview(
                makeBadgeView(content: label.title, color: UIColor(red: 32, green: 156, blue: 128))
            )
        }
        checkBoxWrapper.button.isSelected = isCheck
    }
    
    @IBAction func toucedCheck(_ sender: Any) {
        delegate?.checked(self)
    }
    
    func makeBadgeView(content: String, color: UIColor) -> BadgeView {
        let view = BadgeView()
        view.borderColor = color
        view.backgroundColor = color
        view.borderWidth = 1
        view.cornerRadius = 5
        view.text = content
        return view
    }
}
