//
//  InputField.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/03.
//

import UIKit

class InputField: UIView {
    private let xibName = "InputField"
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var textField: UITextField!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.config()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.config()
    }
    
    private func config() {
        guard let view = Bundle.main.loadNibNamed(xibName, owner: self, options: nil)?.first as? UIView else {
            return
        }
        
        view.frame = self.bounds
        self.addSubview(view)
    }
    
    func clear() {
        textField.text = ""
    }
    
    func setTitle(_ title: String) {
        titleLabel.text = title
    }
    
    func setText(_ text: String) {
        textField.text = text
    }
}
