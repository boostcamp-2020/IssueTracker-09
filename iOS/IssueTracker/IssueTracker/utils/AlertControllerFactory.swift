//
//  AlertControllerFactory.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/10.
//

import UIKit

class AlertControllerFactory {
    static var shared = AlertControllerFactory()
    private init() {}
    
    func makeSimpleAlert(title: String,
                         message: String,
                         handler: ((UIAlertAction) -> Void)? = nil) -> UIAlertController {
        let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertController.Style.alert)
        let okAction = UIAlertAction(title: "OK", style: .default, handler: handler)
        alert.addAction(okAction)
        return alert
    }
}
