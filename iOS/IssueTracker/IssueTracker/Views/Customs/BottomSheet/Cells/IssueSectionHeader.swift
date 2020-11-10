//
//  IssueSectionHeader.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/11.
//

import UIKit

class IssueSectionHeader: UICollectionReusableView {
    @IBOutlet private weak var title: UILabel!
    @IBOutlet private weak var touchedEditButton: UIButton!
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
}
