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
    
    var milestone: Milestone?
    
    lazy var activityIndicator: UIActivityIndicatorView = {
        let activityIndicator = UIActivityIndicatorView()
        activityIndicator.frame = CGRect(x: 0, y: 0, width: 50, height: 50)
        activityIndicator.center = view.center
        activityIndicator.hidesWhenStopped = true
        activityIndicator.style = .large
        activityIndicator.stopAnimating()
        return activityIndicator
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupTitle()
        addKeyboardObserver()
    }
    
    func config(milestone: Milestone) {
        self.milestone = milestone
        titleInputField.setText(milestone.title)
        deadlineInputField.setText(milestone.deadline)
        descriptionInputField.setText(milestone.content)
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
        guard let title = titleInputField.textField.text, title != "",
              let deadline = deadlineInputField.textField.text, deadline != "",
              let description = descriptionInputField.textField.text, description != "" else {
            let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "마일스톤 수정 실패", message: "모든 항목을 채워주세요")
            present(alert, animated: true, completion: nil)
            return
        }
        
        let dateFormatterGet = DateFormatter()
        dateFormatterGet.dateFormat = "yyyy-MM-dd"
        
        guard dateFormatterGet.date(from: deadline) != nil else {
            let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "마일스톤 수정 실패", message: "날짜 형식이 올바르지 않습니다")
            present(alert, animated: true, completion: nil)
            return
        }
        
        activityIndicator.startAnimating()
        if var milestone = milestone {
            milestone.title = title
            milestone.deadline = deadline
            milestone.content = description
            MilestoneNetworkService().modifyMilestone(milestone) { [weak self] result in
                self?.activityIndicator.stopAnimating()
                switch result {
                case .success(_):
                    NotificationCenter.default.post(name: .didMilestoneChangedNotification, object: self)
                    self?.dismiss(animated: true, completion: nil)
                case .failure(let error):
                    let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "마일스톤 수정 에러", message: error.localizedDescription)
                    self?.present(alert, animated: true, completion: nil)
                }
            }
        } else {
            let milestone = Milestone(id: 0, title: title, content: description, deadline: deadline, isOpened: true, openCount: nil, totalCount: nil)
            MilestoneNetworkService().addMilestone(milestone) { [weak self] result in
                self?.activityIndicator.stopAnimating()
                switch result {
                case .success(_):
                    NotificationCenter.default.post(name: .didMilestoneAppend, object: self)
                    self?.dismiss(animated: true, completion: nil)
                case .failure(let error):
                    let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "마일스톤 수정 에러", message: error.localizedDescription)
                    self?.present(alert, animated: true, completion: nil)
                }
            }
        }
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
