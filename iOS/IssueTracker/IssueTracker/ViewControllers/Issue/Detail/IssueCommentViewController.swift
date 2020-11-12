//
//  IssueCommentViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/12.
//

import UIKit

class IssueCommentViewController: UIViewController {
    
    @IBOutlet weak var textView: UITextView!
    private var service: IssueEditService?
    
    init?(coder: NSCoder, service: IssueEditService) {
        self.service = service
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addKeyboardObserver()
    }
    
    @IBAction func touchedCloseButton(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func touchedAddButton(_ sender: Any) {
        service?.willAddComment(content: textView.text)
        self.dismiss(animated: true, completion: nil)
    }
}

extension IssueCommentViewController {
    private func addKeyboardObserver() {
        NotificationCenter.default.addObserver(self, selector: #selector(willKeyboardShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(willKeyboardHide), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    @objc func willKeyboardShow(_ notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
            UIView.animate(withDuration: 0.3, animations: {
                self.view.transform = CGAffineTransform(translationX: 0, y: -keyboardSize.height / 2)
            })
        }
    }
    
    @objc func willKeyboardHide(_ notification: NSNotification) {
        view.transform = .identity
    }
}
