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
    }
    
    private func setupTitle() {
        titleInputField.setTitle("제목")
        deadlineInputField.setTitle("완료\n날짜")
        descriptionInputField.setTitle("설명")
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
}
