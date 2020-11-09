//
//  FilterCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/03.
//

import UIKit

class FilterCoordinator: ChildCoordinator {
    private enum StoryboardName: String {
        case Filter
        case Search
    }
    
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String : ChildCoordinator] = [: ]
    
    private weak var parent: UIViewController?
    private let navigationController = UINavigationController()
    
    required init(window: UIWindow, parent: UIViewController) {
        self.window = window
        self.parent = parent
    }
    
    func start() {
        let storyBoard = UIStoryboard(name: StoryboardName.Filter.rawValue, bundle: nil)
        let viewController = storyBoard.instantiateViewController(
            identifier: "FilterViewController",
            creator: {
                coder in
                return FilterViewController(coder: coder, delegate: self)
            })
        
        navigationController.navigationBar.isHidden = true
        navigationController.viewControllers = [viewController]
        parent?.present(navigationController, animated: true, completion: nil)
    }
}

extension FilterCoordinator: MoveToSearchPage {
    func move(to type: SearchType) {
        let storyBoard = UIStoryboard(name: StoryboardName.Search.rawValue, bundle: nil)
        let viewController = storyBoard.instantiateViewController(
            identifier: "FilterSearchViewController",
            creator: {
                coder in
                return FilterSearchViewController(coder: coder, delegate: self, type: type)
            })
        navigationController.pushViewController(viewController, animated: true)
    }
}

extension FilterCoordinator: SearchViewControllerDelegate {
    func back() {
        print("search page close")
    }
    
    func done() {
        print("search page done")
    }
}
