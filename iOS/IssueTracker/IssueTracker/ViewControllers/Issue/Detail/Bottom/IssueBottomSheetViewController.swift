//
//  IssueBottomSheetViewController.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/05.
//

import UIKit

protocol IssueEditDelegate: AnyObject {
    func touchedEditButton(key: EditKey)
}

class IssueBottomSheetViewController: UIViewController {
    private enum Section: Int, CaseIterable {
        case assignees, labels, milestone
        
        func columnCount(for width: CGFloat) -> Int {
            let wideMode = width > 800
            switch self {
            case .assignees:
                return wideMode ? 10 : 5
                
            case .labels:
                return wideMode ? 6 : 3
                
            case .milestone:
                return wideMode ? 2 : 1
            }
        }
    }
    
    @IBOutlet private weak var assigneeView: AssigneeView!
    @IBOutlet private weak var labelsView: LabelsView!
    @IBOutlet private weak var milestoneView: MilestoneView!
    
//    private var dataSource: UICollectionViewDiffableDataSource<Section, Any>! = nil
    private weak var delegate: IssueEditDelegate?
    
    let fullView: CGFloat = 100
    var partialView: CGFloat {
        return UIScreen.main.bounds.height - 150
    }
    
    private var issue: Issue?
    
    init?(coder: NSCoder, issue: Issue, delegate: IssueEditDelegate) {
        self.issue = issue
        self.delegate = delegate
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let gesture = UIPanGestureRecognizer.init(target: self, action: #selector(IssueBottomSheetViewController.panGesture))
        gesture.delegate = self
        view.addGestureRecognizer(gesture)
        
        if let user = issue?.user {
            assigneeView.configure(assignee: user)
        }
        
        if let labels = issue?.labels {
            labelsView.configure(labels: labels)
        }
        
        if let milestone = issue?.milestone {
            milestoneView.configure(milestone: milestone)
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        UIView.animate(withDuration: 0.3, animations: { [weak self] in
            let frame = self?.view.frame
            let yComponent = self?.partialView
            self?.view.frame = CGRect(x: 0, y: yComponent!, width: frame!.width, height: frame!.height - 100)
        })
    }
    
    @IBAction func touchedAssigneeEdit(_ sender: Any) {
        delegate?.touchedEditButton(key: .assignee)
    }
    @IBAction func touchedLabelsEdit(_ sender: Any) {
        delegate?.touchedEditButton(key: .label)
    }
    @IBAction func touchedMilestoneEdit(_ sender: Any) {
        delegate?.touchedEditButton(key: .milestone)
    }
}


extension IssueBottomSheetViewController {
    func createLayout() -> UICollectionViewLayout {
        let layout = UICollectionViewCompositionalLayout {
            (sectionIndex: Int, layoutEnvironment: NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection? in
            guard let layoutKind = Section(rawValue: sectionIndex) else { return nil }
            
            let columns = layoutKind.columnCount(for: layoutEnvironment.container.effectiveContentSize.width)
            
            let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.2),
                                                  heightDimension: .fractionalHeight(1.0))
            let item = NSCollectionLayoutItem(layoutSize: itemSize)
            item.contentInsets = NSDirectionalEdgeInsets(top: 2, leading: 2, bottom: 2, trailing: 2)
            
            let groupHeight = layoutKind == .milestone ?
                NSCollectionLayoutDimension.absolute(44) : NSCollectionLayoutDimension.fractionalWidth(0.2)
            let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                   heightDimension: groupHeight)
            let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: columns)
            
            let section = NSCollectionLayoutSection(group: group)
            section.contentInsets = NSDirectionalEdgeInsets(top: 20, leading: 20, bottom: 20, trailing: 20)
            
            
            let sectionHeader = NSCollectionLayoutBoundarySupplementaryItem(
                layoutSize: NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                   heightDimension: .estimated(44)),
                elementKind: "IssueDetailHeader",
                alignment: .top)
            
            sectionHeader.pinToVisibleBounds = false
            sectionHeader.zIndex = 2
            section.boundarySupplementaryItems = [sectionHeader]
            
            return section
        }
        return layout
    }
    
    func configureDataSource() {
        let headerRegistration = UICollectionView.SupplementaryRegistration
        <IssueSectionHeader>(elementKind: "IssueDetailHeader") { (supplementaryView, string, indexPath) in
            switch Section(rawValue: indexPath.section) {
            case .assignees:
                supplementaryView.configure(key: .assignee)
            case .labels:
                supplementaryView.configure(key: .label)
            case .milestone:
                supplementaryView.configure(key: .milestone)
            default:
                return
            }
        }
    }
}
