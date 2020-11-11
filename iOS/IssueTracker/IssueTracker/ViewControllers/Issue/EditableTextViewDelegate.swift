//
//  EditableTextView.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/05.
//

import UIKit

@objc protocol ImagepickerDelegate: AnyObject {
    func didInsertImageTapped()
}

class EditableTextViewDelegate: NSObject, UITextViewDelegate {
    private var placeholder: String
    private var placeholderColor: UIColor
    private lazy var networkService = ImageNetworkService()
    private weak var delegate: ImagepickerDelegate?
    
    init(delegate: ImagepickerDelegate, placeholder: String = "코멘트는 여기에 작성하세요", placeholderColor: UIColor = .systemGray) {
        self.placeholder = placeholder
        self.placeholderColor = placeholderColor
    }
    
    func textViewDidBeginEditing (_ textView: UITextView) {
        if textView.textColor == placeholderColor && textView.isFirstResponder {
            setPlaceholder(to: false, textView: textView)
        }
        
        let insertImage = UIMenuItem(title: "이미지 추가", action: #selector(delegate?.didInsertImageTapped))
        UIMenuController.shared.menuItems = [insertImage]
    }
    
    func textViewDidEndEditing (_ textView: UITextView) {
        if textView.text.isEmpty || textView.text == "" {
            setPlaceholder(to: true, textView: textView)
        }
    }
    
    func setPlaceholder(to status: Bool, textView: UITextView) {
        if status {
            textView.textColor = placeholderColor
            textView.text = placeholder
        } else {
            textView.text = nil
            textView.textColor = .black
        }
    }
}
