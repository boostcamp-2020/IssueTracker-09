//
//  MilestoneView.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import UIKit

class MilestoneView: UIView {
    @IBOutlet private weak var name: UILabel!
    @IBOutlet private weak var progress: UIProgressView!
    
    func configure(milestone: Milestone) {
        name.text = milestone.title
        
        if let openCount = milestone.openCount,
           let totalCount = milestone.totalCount {
            let percent = openCount / totalCount * 100
            progress.progress = Float(percent)
            return
        }
        
        if nil == milestone.openCount {
            progress.progress = 0
        } else {
            progress.progress = 100
        }
        
    }
}
