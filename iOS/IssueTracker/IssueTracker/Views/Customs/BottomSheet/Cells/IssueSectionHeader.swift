//
//  IssueSectionHeader.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/11.
//

import UIKit

class IssueSectionHeader: UICollectionReusableView {
    @IBOutlet private weak var title: UILabel!
    
    private var key:EditKey?
    
    func configure(key: EditKey) {
        self.key = key
        
        switch key {
        case .assignee:
            title.text = "담당자"
        case .label:
            title.text = "레이블"
        case .milestone:
            title.text = "마일스톤"
        }
    }
    @IBAction func touchedEditButton(_ sender: Any) {
        guard let key = key else { return }
        let userInfo: [String: EditKey] = ["editKey": key]
        NotificationCenter.default.post(name: .touchedEditKey, object: nil, userInfo: userInfo)
    }
}

extension Notification.Name {
    static let touchedEditKey = Notification.Name(rawValue: "touchedEditKey")
}
