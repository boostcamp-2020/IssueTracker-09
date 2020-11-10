//
//  IssueAppendViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/05.
//

import UIKit
import MarkdownView

class IssueAppendViewController: UIViewController {
    @IBOutlet weak var textView: UITextView!
    var textViewDelegate: EditableTextViewDelegate?
    var markdownView: MarkdownView?
    @IBOutlet weak var titleField: UITextField!
    
    enum SegmentTitle: Int {
        case markdown = 0
        case preview
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureTextViewDelegate()
    }
    
    private func configureTextViewDelegate() {
        textViewDelegate = EditableTextViewDelegate()
        textViewDelegate?.setPlaceholder(textView: textView)
        textView.delegate = textViewDelegate
    }
    
    private func configureMarkdownView() {
        // 재활용 할 순 없을까?
        let markdownView = MarkdownView()
        // TODO: - placeholder 하드코딩 제거
        if !textView.text.isEmpty, textView.text != "코멘트는 여기에 작성하세요" {
            markdownView.load(markdown: textView.text)
        }
        markdownView.frame = textView.frame
        view.addSubview(markdownView)
        self.markdownView = markdownView
    }
    
    @IBAction func didCancelButtonTapped(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func didSegmentChanged(_ sender: UISegmentedControl) {
        switch sender.selectedSegmentIndex {
        case SegmentTitle.markdown.rawValue:
            UIView.animate(withDuration: 0.5) {
                self.markdownView?.alpha = 0
                self.textView.alpha = 1
            }
        case SegmentTitle.preview.rawValue:
            configureMarkdownView()
            // 0.5초 애니메이션을 줘서 로딩되는 딜레이를 지루하지 않게 한다.
            UIView.animate(withDuration: 0.5) {
                self.markdownView?.alpha = 1
                self.textView.alpha = 0
            }
        default:
            return
        }
    }
    
    private func requestAddComment(issue: Issue, content: String, completion handler: @escaping () -> Void) {
        let networkService = CommentNetworkService()
        networkService.addComment(issue: issue, content: content) { [weak self] result in
            switch result {
            case .success(_):
                handler()
            case .failure(let error):
                self?.presentErrorAlert(title: "댓글 추가 실패", message: error.localizedDescription)
                break
            }
        }
    }
    
    private func requestAddIssue(title: String, completion handler: @escaping (Issue) -> Void) {
        let networkService = IssueNetworkService()
        networkService.addIssue(title: title, labelId: nil, assigneeId: nil, milestoneId: nil) { [weak self] result in
            switch result {
            case .success(let issue):
                handler(issue)
            case .failure(let error):
                self?.presentErrorAlert(title: "이슈 추가 실패", message: error.localizedDescription)
                break
            }
        }
    }
    
    @IBAction func didSendButtonTapped(_ sender: UIButton) {
        guard let title = titleField.text else {
            return
        }
        
        guard let content = textView.text else {
            return
        }
        
        requestAddIssue(title: title) { [weak self] issue in
            self?.requestAddComment(issue: issue, content: content) {
                self?.dismiss(animated: true, completion: nil)
            }
        }
    }
    
    private func presentErrorAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertController.Style.alert)
        let okAction = UIAlertAction(title: "OK", style: .default)
        alert.addAction(okAction)
        present(alert, animated: true, completion: nil)
    }
}
