//
//  EditModeBarItem.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import UIKit

class BarButtonController {
    enum Option: String {
        case selectAll = "전체 선택"
        case deselectAll = "전체 해제"
        case filter = "필터"
    }
    
    func make(option: Option, target: AnyObject, action: Selector) -> UIBarButtonItem {
        let button = UIButton()
        button.setTitle(option.rawValue, for: .normal)
        button.setTitleColor(UIColor.systemBlue, for: .normal)
        let barButtonItem = UIBarButtonItem(customView: button)
        button.addTarget(target, action: action, for: .touchUpInside)
        
        return barButtonItem
    }
}
