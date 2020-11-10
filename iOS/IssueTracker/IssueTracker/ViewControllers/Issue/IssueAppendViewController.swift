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
        let markdownView = MarkdownView()
        markdownView.load(markdown: textView.text)
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
}
