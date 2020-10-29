//
//  EditModeBarItem.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/29.
//

import UIKit

class BarButtonController {
    enum Option: String, CaseIterable {
        case selectAll = "전체 선택"
        case deselectAll = "전체 해제"
        case filter = "필터"
    }
    var buttons: [Option: UIBarButtonItem] = [:]
    
    init() {
        for option in Option.allCases {
            buttons[option] = createBarButton(option: option)
        }
    }
    
    private func createBarButton(option: Option) -> UIBarButtonItem {
        let button = UIButton()
        button.setTitle(option.rawValue, for: .normal)
        button.setTitleColor(UIColor.systemBlue, for: .normal)
        let barButtonItem = UIBarButtonItem(customView: button)
        
        return barButtonItem
    }
    
    func addTarget(option: Option, target: AnyObject, action: Selector) {
        (buttons[option]?.customView as? UIButton)?.addTarget(target, action: action, for: .touchUpInside)
    }
}
