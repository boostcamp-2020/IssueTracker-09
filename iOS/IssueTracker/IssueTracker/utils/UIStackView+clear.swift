//
//  UIStackView+clear.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/05.
//

import UIKit

extension UIStackView {
    func clear() {
        self.arrangedSubviews.forEach { $0.removeFromSuperview() }
    }
}
