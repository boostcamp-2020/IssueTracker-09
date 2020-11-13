//
//  RoundButton.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/28.
//

import UIKit

@IBDesignable
class RoundButton: UIButton {
    
    @IBInspectable
    var cornerRadius: CGFloat {
        get { return layer.cornerRadius }
        set { layer.cornerRadius = newValue }
    }
    
    @IBInspectable
    var borderWidth: CGFloat {
        get { return layer.borderWidth }
        set { layer.borderWidth = newValue }
    }
    
    @IBInspectable
    var borderColor: UIColor? {
        get { return UIColor.init(cgColor: layer.borderColor!) }
        set { layer.borderColor = newValue?.cgColor }
    }
    
    @IBInspectable
    var shadowColor: UIColor {
        get { return UIColor.init(cgColor: layer.shadowColor!) }
        set { layer.shadowColor = newValue.cgColor }
    }
    
    @IBInspectable
    var shadowRadius: CGFloat {
        get { return layer.shadowRadius }
        set { layer.shadowRadius = newValue }
    }
    
    @IBInspectable
    private var shadowOpacity: Float {
        get { layer.shadowOpacity }
        set { layer.shadowOpacity = newValue }
    }
    
    @IBInspectable
    private var shadowOffset: CGSize {
        get { layer.shadowOffset }
        set { layer.shadowOffset = newValue }
    }
}
