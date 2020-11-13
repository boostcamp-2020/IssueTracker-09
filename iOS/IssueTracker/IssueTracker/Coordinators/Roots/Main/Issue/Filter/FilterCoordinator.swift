//
//  FilterCoordinator.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/03.
//

import UIKit

class FilterCoordinator: Coordinator {
    private enum StoryboardName: String {
        case filter = "Filter"
        case search = "Search"
    }
    
    private(set) var window: UIWindow
    private(set) var childCoordinators: [String: Coordinator] = [: ]
    
    private weak var parent: UIViewController?
    private let navigationController = UINavigationController()
    
    init(window: UIWindow, parent: UIViewController) {
        self.window = window
        self.parent = parent
    }
    
    func start() {
        let storyBoard = UIStoryboard(name: StoryboardName.filter.rawValue, bundle: nil)
        let viewController = storyBoard.instantiateViewController(
            identifier: "FilterViewController",
            creator: { coder in
                return FilterViewController(coder: coder, delegate: self)
            })
        
        navigationController.navigationBar.isHidden = true
        navigationController.viewControllers = [viewController]
        parent?.present(navigationController, animated: true, completion: nil)
    }
}

extension FilterCoordinator: MoveToSearchPage {
    func move(to type: Filter.Element) {
        let storyBoard = UIStoryboard(name: StoryboardName.search.rawValue, bundle: nil)
        let viewController = storyBoard.instantiateViewController(
            identifier: "FilterSearchViewController",
            creator: { coder in
                return FilterSearchViewController(coder: coder, type: type)
            })
        navigationController.pushViewController(viewController, animated: true)
    }
}
