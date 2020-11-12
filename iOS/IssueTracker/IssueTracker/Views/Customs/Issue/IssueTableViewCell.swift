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
    @IBOutlet weak var openButton: UIButton!
    @IBOutlet weak var closeButton: UIButton!
    weak var delegate: IssueCellDelegate?
    
    override func prepareForReuse() {
        titleLabel.text = ""
        badgeStackView.clear()
    }
    
    func configure(issue: Issue, isCheck: Bool) {
        titleLabel.text = issue.title
        
        if issue.isOpened {
            openButton.isHidden = false
            closeButton.isHidden = true
        } else {
            openButton.isHidden = true
            closeButton.isHidden = false
        }
        
        if let milestone = issue.milestone?.title {
            badgeStackView.addArrangedSubview(makeBadgeView(content: milestone, color: .systemGray, isMilestone: true))
        }
        
        issue.labels?.forEach { label in
            badgeStackView.addArrangedSubview(
                makeBadgeView(content: label.title, color: UIColor(hexString: label.color) ?? .green)
            )
        }
        checkBoxWrapper.button.isSelected = isCheck
    }
    
    @IBAction func toucedCheck(_ sender: Any) {
        delegate?.checked(self)
    }
    
    func makeBadgeView(content: String, color: UIColor, isMilestone: Bool = false) -> BadgeView {
        let view = BadgeView()
        view.borderColor = color
        view.borderWidth = 1
        view.cornerRadius = 5
        view.textColor = color
        view.text = content
        if isMilestone {
            view.textColor = .black
            view.backgroundColor = UIColor(red: 0.5, green: 0.5, blue: 0.5, alpha: 0.3)
        }
        return view
    }
}
