//
//  MilestoneCollectionViewCell.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import UIKit

@IBDesignable
class MilestoneCollectionViewCell: UICollectionViewCell {
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
}
