//
//  ViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/10/27.
//

import UIKit
import AuthenticationServices

class SignViewController: UIViewController {
    @IBOutlet weak var loginProviderStackView: UIStackView!
    private var request: AuthorizationRequestable?
    private var authorization: AppleAuthorizationController?
    
    init?(coder: NSCoder, request: AuthorizationRequestable) {
        self.request = request
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUpProviderLoginView()
        authorization = AppleAuthorizationController(window: view.window)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    func setUpProviderLoginView() {
        let button = ASAuthorizationAppleIDButton()
        button.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
        loginProviderStackView.addArrangedSubview(button)
    }
    
    @IBAction func touchedCompleteButton(_ sender: Any) {
        request?.requestCode()
    }
    
    @objc func handleAuthorizationAppleIDButtonPress() {
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        request.requestedScopes = [.fullName, .email]
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = authorization
        authorizationController.presentationContextProvider = authorization
        authorizationController.performRequests()
    }
}
