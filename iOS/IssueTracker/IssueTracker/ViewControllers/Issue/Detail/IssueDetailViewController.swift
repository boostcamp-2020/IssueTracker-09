//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/04.
//

import UIKit

class IssueDetailViewController: UIViewController {
    private enum Section: CaseIterable {
        case content, comment
    }
    @IBOutlet weak var collectionView: UICollectionView!
    private var service: IssueDetailService?
    private var issue: Issue?
    private var comments: [Comment] = []
    private var assignee: Assignee?
    
    init?(coder: NSCoder, service: IssueDetailService) {
        self.service = service
        super.init(coder: coder)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        service?.requestUsers()
        service?.requestComments()
    }
}

extension IssueDetailViewController: IssueDetailServiceDelegate {
    func didCommentsLoaded(comments: [Comment]) {
        issue = service?.issue
        self.comments = comments
        configureHierarchy()
        addBottomSheetView()
    }
    
    func didAssigneeLoaded(assignee: [User]) {
        self.assignee = Assignee(assignee: assignee)
    }
}

extension IssueDetailViewController {
    func addBottomSheetView() {
        guard let bottomSheetVC = UIStoryboard(name: "IssueBottomSheet", bundle: nil).instantiateInitialViewController() as? IssueBottomSheetViewController
        else { return }

        self.addChild(bottomSheetVC)
        self.view.addSubview(bottomSheetVC.view)
        bottomSheetVC.didMove(toParent: self)

        let height = view.frame.height
        let width  = view.frame.width
        bottomSheetVC.view.frame = CGRect(x: 0, y: self.view.frame.maxY, width: width, height: height)
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
        collectionView.delegate = self
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
            return commentCell
        
        }
    }
}

extension IssueDetailViewController: UICollectionViewDelegate {
    
}
