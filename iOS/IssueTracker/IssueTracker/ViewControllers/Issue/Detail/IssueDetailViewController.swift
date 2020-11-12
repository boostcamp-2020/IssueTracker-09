//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/04.
//

import UIKit

protocol IssueDetailCoordinatorDelegate: AnyObject {
    func presentToAssigneeEdit(assignees: Assignees)
    func presentToLabelEdit(labels: Labels)
    func presentToMilestoneEdit(milstones: Milestones)
    func presentToComment()
    func resumeView()
}

class IssueDetailViewController: UIViewController {
    private enum Section: CaseIterable {
        case content, comment
    }
    @IBOutlet private weak var collectionView: UICollectionView!
    
    var service: IssueDetailService?
    var issue: Issue? {
        didSet {
            bottomSheetViewController?.issue = issue
            dispatchGroup.enter()
            service?.requestComments()
            asyncNotify { [weak self] in
                self?.collectionView.reloadData()
            }
        }
    }
    
    private weak var delegate: IssueDetailCoordinatorDelegate?
    private let dispatchGroup = DispatchGroup()
    
    private var comments: [Comment] = []
    private var assignee: Assignees?
    private var milestones: Milestones?
    private var labels: Labels?
    
    private var bottomSheetViewController: IssueBottomSheetViewController?
    
    init?(coder: NSCoder, delegate: IssueDetailCoordinatorDelegate) {
        self.delegate = delegate
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        request()
        
    }
    
    private func request() {
        dispatchGroup.enter()
        service?.requestComments()
        
        dispatchGroup.enter()
        service?.requestUsers()
        
        dispatchGroup.enter()
        service?.requestLabels()
        
        dispatchGroup.enter()
        service?.requestMilestones()
        
        asyncNotify {
            self.issue = self.service?.issue
            self.configureHierarchy()
            self.addBottomSheetView()
        }
    }
    
    private func asyncNotify(compltion handler: @escaping () -> ()) {
        dispatchGroup.notify(queue: DispatchQueue.main) {
            handler()
        }
    }
    
    private func updateComments() {
        dispatchGroup.enter()
        service?.requestComments()
    }
}

extension IssueDetailViewController: IssueDetailServiceDelegate {
    func didCommentsLoaded(comments: [Comment]?) {
        if let comments = comments  {
            self.comments = comments
        }
        dispatchGroup.leave()
    }
    
    func didAssigneesLoaded(assignee: [User]?) {
        if let assignee = assignee {
            self.assignee = Assignees(assignees: assignee)
        }
        dispatchGroup.leave()
    }
    
    func didLabelsLoaded(labels: [Label]?) {
        if let labels = labels {
            self.labels = Labels(labels: labels)
        }
        dispatchGroup.leave()
    }
    
    func didMilestonesLoaded(milestones: [Milestone]?) {
        if let milestones = milestones {
            self.milestones = Milestones(milestones: milestones)
        }
        dispatchGroup.leave()
    }
}

extension IssueDetailViewController: IssueEditDelegate {
    func touchedEditButton(key: EditKey) {
        switch key {
        case .assignee:
            guard let assignee = assignee else { return }
            delegate?.presentToAssigneeEdit(assignees: assignee)
        case .label:
            guard let labels = labels else { return }
            delegate?.presentToLabelEdit(labels: labels)
        case .milestone:
            guard let milestones = milestones else { return }
            delegate?.presentToMilestoneEdit(milstones: milestones)
        }
    }
    
    func touchedCommentButton() {
        delegate?.presentToComment()
    }
    
    func didChangeStatus() {
        delegate?.resumeView()
    }
}

extension IssueDetailViewController {
    func addBottomSheetView() {
        guard let issue = issue else {
            return
        }
        
        let storyBoard = UIStoryboard(name: "IssueBottomSheet", bundle: nil)
        bottomSheetViewController = storyBoard.instantiateViewController(
            identifier: "IssueBottomSheetViewController",
            creator: {
                coder in
                return IssueBottomSheetViewController(coder: coder, issue: issue, delegate: self)
            })
        
        guard let viewController = bottomSheetViewController else { return }
        let height = view.frame.height
        let width  = view.frame.width
        viewController.view.frame = CGRect(x: 0, y: self.view.frame.maxY, width: width, height: height)
        viewController.didMove(toParent: self)
        self.addChild(viewController)
        self.view.addSubview(viewController.view)
    }
}

extension IssueDetailViewController {
    private func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .grouped)
        configuration.showsSeparators = false
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    private func configureHierarchy() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.dataSource = self
    }
}

extension IssueDetailViewController: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return Section.allCases.count
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        switch section {
        case 0:
            return 1
        default:
            return comments.count
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        switch indexPath.section {
        case 0:
            guard let issue = issue,
                  let contentCell = collectionView.dequeueReusableCell(withReuseIdentifier: "contentCell", for: indexPath) as? IssueContentCollectionViewCell else {
                return UICollectionViewCell()
            }
            
            contentCell.configure(issue: issue)
            return contentCell
            
        default:
            guard let user = assignee?.find(id: comments[indexPath.item].user_id),
                  let commentCell = collectionView.dequeueReusableCell(withReuseIdentifier: "commentCell", for: indexPath) as? IssueCommentCollectionViewCell else {
                return UICollectionViewCell()
            }
            
            commentCell.configure(user: user, comment: comments[indexPath.item])
            commentCell.handler = { [weak self] in
                let alert = AlertControllerFactory.shared.makeSimpleAlert(title: "IssueTracker09", message: "아직 기능이 없어요 ㅠ_ㅠ")
                self?.present(alert, animated: true, completion: nil)
            }
            return commentCell
        }
    }
}
