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
        let sizeOfOneSide = min(frame.width, frame.height)
        layer.cornerRadius = sizeOfOneSide / 2

        layer.borderWidth = 1
        layer.borderColor = UIColor.systemGray.cgColor
    }
    
    @objc private func didChecked(sender: UIButton) {
        isSelected = !isSelected
        tintColor = UIColor(red: 1, green: 1, blue: 1, alpha: 1)
        setBackgroundImage(UIImage(systemName: "checkmark")?.withTintColor(.blue, renderingMode: .alwaysOriginal), for: .selected)
    }
}
