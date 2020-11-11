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
                return wideMode ? 4 : 2
            case .labels:
                return wideMode ? 8 : 4
            case .milestone:
                return wideMode ? 2 : 1
            }
        }
    }
    
    @IBOutlet weak var statusButton: RoundButton!
    @IBOutlet weak var collectionView: UICollectionView!
    
    private var dataSource: UICollectionViewDiffableDataSource<Section, Int>! = nil
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
        collectionView.collectionViewLayout = createLayout()
        configureDataSource()
        addNotification()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        UIView.animate(withDuration: 0.3, animations: { [weak self] in
            let frame = self?.view.frame
            let yComponent = self?.partialView
            self?.view.frame = CGRect(x: 0, y: yComponent!, width: frame!.width, height: frame!.height - 100)
        })
    }
    
    private func statusDidChange() {
        guard let issue = self.issue else { return }
        
        if issue.isOpened {
            statusButton.setTitle("Open", for: .normal)
        } else {
            statusButton.setTitle("Close", for: .normal)
        }
        
    }
    
    @IBAction func touchedCommentButton(_ sender: Any) {
    }
    
    @IBAction func touchedStatusButton(_ sender: Any) {
        guard let issue = self.issue else { return }
        let service = IssueNetworkService()
        service.modifyIssueStatus(of: issue) { [weak self] (result) in
            switch result {
            case .success(let isSuccess):
                print("무슨 처리를 해줘야하징..")
                print("\(isSuccess)")
                if isSuccess {
                    self?.statusDidChange()
                }
            case .failure(let error):
                let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "IssueTracker", message: error.localizedDescription)
                self?.present(alert, animated: false, completion: nil)
            }
        }
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
            
            var groupHeight: NSCollectionLayoutDimension {
                switch  layoutKind {
                case .assignees:
                    return NSCollectionLayoutDimension.fractionalWidth(0.2)
                case .labels:
                    return NSCollectionLayoutDimension.fractionalWidth(0.15)
                case .milestone:
                    return NSCollectionLayoutDimension.fractionalWidth(0.2)
                }
            }
            
            let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                   heightDimension: groupHeight)
            let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitem: item, count: columns)
            
            let section = NSCollectionLayoutSection(group: group)
            
            let sectionHeader = NSCollectionLayoutBoundarySupplementaryItem(
                layoutSize: NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                   heightDimension: .estimated(44)),
                elementKind: UICollectionView.elementKindSectionHeader,
                alignment: .top)
            
            sectionHeader.pinToVisibleBounds = false
            sectionHeader.zIndex = 2
            section.boundarySupplementaryItems = [sectionHeader]
            
            return section
        }
        return layout
    }
    
    func configureDataSource() {
        dataSource = UICollectionViewDiffableDataSource<Section, Int>(collectionView: collectionView) {
            (collectionView: UICollectionView, indexPath: IndexPath, identifier: Int) -> UICollectionViewCell? in
            guard let section = Section(rawValue: indexPath.section) else { return nil }
            
            switch section {
            case .assignees:
                guard let assignees = self.issue?.assignees,
                      let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "AssigneeCell", for: indexPath) as? AssigneeCell else { return UICollectionViewCell() }
                cell.configure(assignee: assignees[identifier])
                return cell
            case .labels:
                guard let labels = self.issue?.labels,
                      let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "LabelCell", for: indexPath) as? LabelCell else { return UICollectionViewCell() }
                cell.configure(label: labels[identifier])
                return cell
            case .milestone:
                guard let milestone = self.issue?.milestone,
                      let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MilestoneCell", for: indexPath) as? MilestoneCell else { return UICollectionViewCell() }
                cell.configure(milestone: milestone)
                return cell
            }
        }
        
        dataSource.supplementaryViewProvider = { (collectionView, kind, indexPath) in
            guard let section = Section(rawValue: indexPath.section),
                  let sectionHeader = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "IssueSectionHeader", for: indexPath) as? IssueSectionHeader else {
                return UICollectionReusableView()
            }
            
            switch section {
            case .assignees:
                sectionHeader.configure(key: .assignee)
            case .labels:
                sectionHeader.configure(key: .label)
            case .milestone:
                sectionHeader.configure(key: .milestone)
            }
            return sectionHeader
        }
        
        // initial data
        var snapshot = NSDiffableDataSourceSnapshot<Section, Int>()
        Section.allCases.forEach {
            snapshot.appendSections([$0])
            var count = 0

            switch $0 {
            case .assignees:
                count = issue?.assignees?.count ?? 0
            case .labels:
                count = issue?.labels?.count ?? 0
            case .milestone:
                count = issue?.milestone != nil ? 1 : 0
            }
            
            snapshot.appendItems(Array(0..<count))
        }
        dataSource.apply(snapshot, animatingDifferences: false)
    }
}

extension IssueBottomSheetViewController {
    func addNotification() {
        NotificationCenter.default.addObserver(self, selector: #selector(didTokenRecieved), name: .touchedEditKey, object: nil)
    }
    
    @objc func didTokenRecieved(notification: NSNotification) {
        guard let userInfo = notification.userInfo,
              let key = userInfo["editKey"] as? EditKey else { return }
        
        delegate?.touchedEditButton(key: key)
    }
}

