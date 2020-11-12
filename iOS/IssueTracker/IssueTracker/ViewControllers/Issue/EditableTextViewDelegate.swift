//
//  EditableTextView.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/05.
//

import UIKit

class EditableTextViewDelegate: NSObject, UITextViewDelegate {
    private var placeholder: String
    private var placeholderColor: UIColor
    
    init(placeholder: String = "코멘트는 여기에 작성하세요", placeholderColor: UIColor = .systemGray) {
        self.placeholder = placeholder
        self.placeholderColor = placeholderColor
    }
    
    func textViewDidBeginEditing (_ textView: UITextView) {
        if textView.textColor == placeholderColor && textView.isFirstResponder {
            textView.text = nil
            textView.textColor = .black
        }
    }
    
    func textViewDidEndEditing (_ textView: UITextView) {
        if textView.text.isEmpty || textView.text == "" {
            setPlaceholder(textView: textView)
        }
    }
    
    func setPlaceholder(textView: UITextView) {
        textView.textColor = placeholderColor
        textView.text = placeholder
    }
}
