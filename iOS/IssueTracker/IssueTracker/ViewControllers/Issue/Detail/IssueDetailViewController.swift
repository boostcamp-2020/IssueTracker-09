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
    var service: IssueDetailService?
    private var issue: Issue?
    private var comments: [Comment] = []
    private var assignee: Assignees?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        service?.requestComments()
        service?.requestUsers()
    }
}

extension IssueDetailViewController: IssueDetailServiceDelegate {
    func didCommentsLoaded(comments: [Comment]) {
        issue = service?.issue
        self.comments = comments
    }
    
    func didAssigneeLoaded(assignee: [User]) {
        self.assignee = Assignees(assignees: assignee)
        configureHierarchy()
        addBottomSheetView()
    }
}

extension IssueDetailViewController {
    func addBottomSheetView() {
        guard let issue = issue else {
            return
        }
        
        let storyBoard = UIStoryboard(name: "IssueBottomSheet", bundle: nil)
        let bottomSheetViewController = storyBoard.instantiateViewController(
            identifier: "IssueBottomSheetViewController",
            creator: {
                coder in
                return IssueBottomSheetViewController(coder: coder, issue: issue)
            })
        self.addChild(bottomSheetViewController)
        self.view.addSubview(bottomSheetViewController.view)
        bottomSheetViewController.didMove(toParent: self)
        
        let height = view.frame.height
        let width  = view.frame.width
        bottomSheetViewController.view.frame = CGRect(x: 0, y: self.view.frame.maxY, width: width, height: height)
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
