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
    private weak var delegate: NextCoordinatorDelegate?
    private var request: AuthorizationRequestable?
    
    init?(coder: NSCoder, delegate: NextCoordinatorDelegate, request: AuthorizationRequestable) {
        self.delegate = delegate
        self.request = request
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUpProviderLoginView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        performExistingAccountSetupFlows()
    }
    
    func setUpProviderLoginView() {
        let button = ASAuthorizationAppleIDButton()
        button.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside)
        loginProviderStackView.addArrangedSubview(button)
    }
    
    
    // 이건 바로 인증 달리는건가??
    func performExistingAccountSetupFlows() {
        // Prepare requests for both Apple ID and password providers.
        let authorization = AppleAuthorizationController(window: view.window)
        let requests = [ASAuthorizationAppleIDProvider().createRequest(),
                        ASAuthorizationPasswordProvider().createRequest()]
        
        // Create an authorization controller with the given requests.
        let authorizationController = ASAuthorizationController(authorizationRequests: requests)
        authorizationController.delegate = authorization
        authorizationController.presentationContextProvider = authorization
        authorizationController.performRequests()
    }
    
    @IBAction func touchedCompleteButton(_ sender: Any) {
//        request?.requestCode()
        
        self.delegate?.navigateToPage()
    }
    
    @objc func handleAuthorizationAppleIDButtonPress() {
        let authorization = AppleAuthorizationController(window: view.window)
        
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        request.requestedScopes = [.fullName, .email]
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = authorization
        authorizationController.presentationContextProvider = authorization
        authorizationController.performRequests()
    }
}
