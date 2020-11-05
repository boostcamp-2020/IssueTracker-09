//
//  IssueAppendViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/05.
//

import UIKit

class IssueAppendViewController: UIViewController {
    @IBOutlet weak var textView: UITextView!
    var textViewDelegate: EditableTextViewDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureTextViewDelegate()
    }
    
    private func configureTextViewDelegate() {
        textViewDelegate = EditableTextViewDelegate()
        textViewDelegate?.setPlaceholder(textView: textView)
        textView.delegate = textViewDelegate
    }
    
    @IBAction func didCancelButtonTapped(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
}
