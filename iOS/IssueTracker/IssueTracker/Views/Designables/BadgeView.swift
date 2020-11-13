//
//  BadgeView.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/10/06.
//

import UIKit

// https://stackoverflow.com/questions/27459746/adding-space-padding-to-a-uilabel
@IBDesignable
class BadgeView: UILabel {
    @IBInspectable var topInset: CGFloat = 0
    @IBInspectable var bottomInset: CGFloat = 0
    @IBInspectable var leftInset: CGFloat = 6.0
    @IBInspectable var rightInset: CGFloat = 6.0
    
    // init을 모두 다 오버로딩 하지 않으면 IBDesignablesAgent 에서 오류가 발생한다.
    // -> InterfaceBuilder역시 iOS Simulator 위에서 돌아가기 때문
    // https://medium.com/@esung/ibdesignable-%EC%97%90%EB%9F%AC%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-254001a648f6
    override func drawText(in rect: CGRect) {
        let insets = UIEdgeInsets(top: topInset, left: leftInset, bottom: bottomInset, right: rightInset)
        super.drawText(in: rect.inset(by: insets))
    }
    
    override var intrinsicContentSize: CGSize {
        let size = super.intrinsicContentSize
        return CGSize(width: size.width + leftInset + rightInset,
                      height: size.height + topInset + bottomInset)
    }
    
    override var bounds: CGRect {
        didSet {
            // ensures this works within stack views if multi-line
            preferredMaxLayoutWidth = bounds.width - (leftInset + rightInset)
        }
    }
    
    @IBInspectable var borderColor: UIColor? {
        get {
            guard let color = layer.borderColor else {
                return nil
            }
            return UIColor(cgColor: color)
        }
        set {
            layer.borderColor = newValue?.cgColor
        }
    }
    
    @IBInspectable var borderWidth: CGFloat {
        get {
            return layer.borderWidth
        }
        set {
            layer.borderWidth = newValue
        }
    }
    
    @IBInspectable var cornerRadius: CGFloat {
        get {
            return layer.cornerRadius
        }
        set {
            layer.cornerRadius = newValue
            clipsToBounds = newValue > 0
        }
    }
}
