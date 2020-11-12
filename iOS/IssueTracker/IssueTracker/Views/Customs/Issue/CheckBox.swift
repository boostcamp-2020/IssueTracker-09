//
//  CheckBox.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/28.
//

import UIKit

@IBDesignable
class CheckBox: UIButton {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    private func setup() {
        design()
        addTarget(self, action: #selector(didChecked(sender:)), for: .touchUpInside)
    }
    
    private func design() {
        tintColor = UIColor(red: 1, green: 1, blue: 1, alpha: 1)
        let blueCheckmark = UIImage(systemName: "checkmark.circle")?.withTintColor(.blue, renderingMode: .alwaysOriginal)
        self.setBackgroundImage(blueCheckmark, for: .selected)
        let circle = UIImage(systemName: "circle")?.withTintColor(.systemGray, renderingMode: .alwaysOriginal)
        self.setBackgroundImage(circle, for: .normal)
    }
    
    @objc private func didChecked(sender: UIButton) {
        isSelected = !isSelected
        alpha = 0
        UIView.animate(withDuration: 0.3) {
            self.alpha = 1
        }
    }
}
