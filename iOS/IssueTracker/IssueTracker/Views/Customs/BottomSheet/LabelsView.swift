//
//  LabelsView.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/10.
//

import UIKit

class LabelsView: UIView {
    @IBOutlet private weak var label: UILabel!
    
    func configure(labels: [Label]) {
        let labelsToString = labels.reduce("") { (prev, next) -> String in
            return prev + next.title
        }
        
        label.text = labelsToString
    }
}
