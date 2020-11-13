//
//  LabelCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/12.
//

import UIKit

class LabelCoordinator: Coordinator {
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: Coordinator] = [: ]
    private weak var delegate: MainTabBarDelegate?
    private let service: LabelNetworkService = LabelNetworkService()
    private let navigationController = UINavigationController()
    private var labelViewController: LabelViewController?
    
    init(window: UIWindow, delegate: MainTabBarDelegate) {
        self.window = window
        self.delegate = delegate
        addNotification()
        createLabelViewController()
    }
    
    private func createLabelViewController() {
        let storyBoard = UIStoryboard(name: "Label", bundle: nil)
        labelViewController = storyBoard.instantiateViewController(
            identifier: "LabelViewController",
            creator: { coder in
                return LabelViewController(coder: coder, delegate: self)
            })
    }
    
    func start() {
        guard let viewController = labelViewController else { return }
        
        viewController.title = "레이블"
        navigationController.navigationBar.prefersLargeTitles = true
        navigationController.setViewControllers([viewController], animated: false)
        
        delegate?.setViewController(navigationController, name: .label)
    }
    
    private func presentToIssueAppend(label: Label?) {
        let storyBoard = UIStoryboard(name: "LabelAppend", bundle: nil)
        let labelAppendViewcontroller = storyBoard.instantiateViewController(
            identifier: "LabelAppendViewController",
            creator: { coder in
                return LabelAppendViewController(coder: coder, label: label)
            })
        
        navigationController.present(labelAppendViewcontroller, animated: true, completion: nil)
    }
}

extension LabelCoordinator: LabelCoordinatorDelegate {
    func presentAddLabel() {
        presentToIssueAppend(label: nil)
    }
    
    func presentEditLabel(label: Label) {
        presentToIssueAppend(label: label)
    }
    
    func willRequestLabels() {
        service.fetchLabels { [weak self] result in
            switch result {
            case .success(let labels):
                self?.labelViewController?.didResponseLabels(labels)
            case .failure(let error):
                let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "IssueTracker09",
                                                                          message: error.localizedDescription
                )
                self?.navigationController.present(alert, animated: true, completion: nil)
            }
        }
    }
}

extension LabelCoordinator {
    private func addNotification() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(viewWillResume),
                                               name: .viewWillResume,
                                               object: nil)
    }
    
    @objc func viewWillResume() {
        willRequestLabels()
    }
}
