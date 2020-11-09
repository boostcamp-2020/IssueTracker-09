//
//  MilestoneAppendViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/03.
//

import UIKit

class MilestoneAppendViewController: UIViewController {
    @IBOutlet weak var titleInputField: InputField!
    @IBOutlet weak var deadlineInputField: InputField!
    @IBOutlet weak var descriptionInputField: InputField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTitle()
        addKeyboardObserver()
    }
    
    private func setupTitle() {
        titleInputField.setTitle("제목")
        deadlineInputField.setTitle("완료\n날짜")
        descriptionInputField.setTitle("설명")
    }
    
    private func addKeyboardObserver() {
        NotificationCenter.default.addObserver(self, selector: #selector(willKeyboardShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(willKeyboardHide), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    @IBAction func didCloseButtonTapped(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func didClearButtonTapped(_ sender: UIButton) {
        titleInputField.clear()
        deadlineInputField.clear()
        descriptionInputField.clear()
    }
    
    @IBAction func didSaveButtonTapped(_ sender: UIButton) {
        //TODO
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
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
