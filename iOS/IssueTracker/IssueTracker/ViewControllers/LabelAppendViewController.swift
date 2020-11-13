//
//  LabelAppendViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/13.
//

import UIKit

class LabelAppendViewController: UIViewController {
    private enum AppendType {
        case add, edit
    }
    
    @IBOutlet weak var titleField: UITextField!
    @IBOutlet weak var contentField: UITextView!
    @IBOutlet weak var colorField: UITextField!
    @IBOutlet weak var colorPreview: RoundButton!
    private var label: Label?
    private var type: AppendType = .add
    
    init?(coder: NSCoder, label: Label?) {
        self.label = label
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addKeyboardObserver()
        
        if let label = label {
            configure(label: label)
        } else {
            let hexString = randomColorHexSting()
            colorWillChange(hex: hexString)
        }
    }
    
    private func configure(label: Label) {
        type = .edit
        titleField.text = label.title
        contentField.text = label.content
        colorWillChange(hex: label.color)
    }
    
    private func randomColorHexSting() -> String {
        let red = Int(arc4random_uniform(256))
        let green = Int(arc4random_uniform(256))
        let blue = Int(arc4random_uniform(256))
        
        let rgb = red << 16 | green << 8 | blue << 0
        return String(format: "#%06X", rgb)
    }
    
    private func colorWillChange(hex: String) {
        let color = UIColor(hexString: hex)
        colorField.text = hex
        colorPreview.layer.borderColor = color?.cgColor
        colorPreview.layer.backgroundColor = color?.cgColor
    }
    
    @IBAction func touchedCloseButton(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func touchedRandomButton(_ sender: Any) {
        let hexToString = randomColorHexSting()
        colorWillChange(hex: hexToString)
    }
    
    @IBAction func touchedCompleteButton(_ sender: Any) {
        if let color = colorField.text,
           isValidColor(text: color) {
            let labelColor = UIColor(hexString: color) ?? UIColor.red
            let labelTitle = titleField.text ?? ""
            let labelContent = contentField.text ?? ""
            
            switch type {
            case .add:
                willAddLabel(color: labelColor, title: labelTitle, content: labelContent)
            case .edit:
                willEditLabel(color: labelColor, title: labelTitle, content: labelContent)
            }
        } else {
            presentToAlert(message: "올바른 색상 값을 입력해주세요.")
        }
    }
    
    private func willAddLabel(color: UIColor, title: String, content: String) {
        let service = LabelNetworkService()
        service.addLabel(color: color, title: title, content: content) { [weak self] result in
            switch result {
            case .success( _):
                NotificationCenter.default.post(name: .viewWillResume, object: nil)
                self?.dismiss(animated: true, completion: nil)
            case .failure(let error):
                self?.presentToAlert(message: error.localizedDescription)
            }
        }
    }
    
    private func willEditLabel(color: UIColor, title: String, content: String) {
        guard let label = label else { return }
        
        let modifiedLabel = Label(id: label.id, color: color.toHexString(), title: title, content: content)
        let service = LabelNetworkService()
        service.modifyLabel(to: modifiedLabel) { [weak self] result in
            switch result {
            case .success( _):
                NotificationCenter.default.post(name: .viewWillResume, object: nil)
                self?.dismiss(animated: true, completion: nil)
            case .failure(let error):
                self?.presentToAlert(message: error.localizedDescription)
            }
        }
    }
    
    private func isValidColor(text: String) -> Bool {
        let regEx = "#([0-9a-fA-F]{6})"
        let pred = NSPredicate(format: "SELF MATCHES %@", regEx)
        return pred.evaluate(with: text)
    }
    
    private func presentToAlert(message: String) {
        let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "IssueTracker09", message: message)
        self.present(alert, animated: true, completion: nil)
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
}

extension LabelAppendViewController {
    private func addKeyboardObserver() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(willKeyboardShow),
                                               name: UIResponder.keyboardWillShowNotification,
                                               object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(willKeyboardHide),
                                               name: UIResponder.keyboardWillHideNotification,
                                               object: nil)
    }
    
    @objc func willKeyboardShow(_ notification: NSNotification) {
        let keyboardFrameEndUserInfoKey = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)
        if let keyboardSize = keyboardFrameEndUserInfoKey?.cgRectValue {
            UIView.animate(withDuration: 0.3, animations: {
                self.view.transform = CGAffineTransform(translationX: 0, y: -keyboardSize.height / 2)
            })
        }
    }
    
    @objc func willKeyboardHide(_ notification: NSNotification) {
        view.transform = .identity
    }
}

extension Notification.Name {
    static let viewWillResume = Notification.Name(rawValue: "viewWillResume")
}
