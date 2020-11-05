//
//  CommentNetworkServiceTests.swift
//  IssueTrackerTests
//
//  Created by 현기엽 on 2020/11/05.
//

import XCTest
@testable import IssueTracker

class CommentNetworkServiceTests: XCTestCase {
    let asyncTimeout: TimeInterval = 1
    static let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA0MzgyNTE2fQ.B2JyeokIT-ImtQBL_J7Blz6H2hTjn70WuDZmmnRGz6Y"
    static var originalToken: String?
    
    let issue = Issue(id: 2, title: "", isOpened: true, timestamp: "", assignees: nil, milestone: nil, user: User(id: 0, name: "", image: "", userCode: nil), labels: nil)
    
    override class func setUp() {
        super.setUp()
        
        // 기존 토큰이 있을 경우를 위한 백업
        originalToken = PersistenceManager.shared.load(forKey: .token)
        
        PersistenceManager.shared.save(testToken, forKey: .token)
    }
    
    override class func tearDown() {
        super.tearDown()
        
        // 복원
        if let token = originalToken {
            PersistenceManager.shared.save(token, forKey: .token)
        }
    }
    
    func testAddComment() throws {
        let expectTimer = expectation(description: "testAddComment")
        
        CommentNetworkService().addComment(issue: issue, content: "iOS-testAddComment") { result in
            switch result {
            case .success(_):
                expectTimer.fulfill()
            case .failure(let error):
                XCTFail(error.localizedDescription)
            }
        }
        
        waitForExpectations(timeout: asyncTimeout) { error in
            if let error = error {
                XCTFail("waitForExpectationsWithTimeout errored: \(error)")
            }
        }
    }
    
    func testFetchComments() throws {
        let expectTimer = expectation(description: "testFetchComments")
        
        CommentNetworkService().fetchComments(issue: issue) { result in
            switch result {
            case .success(_):
                expectTimer.fulfill()
            case .failure(let error):
                XCTFail(error.localizedDescription)
            }
        }
        
        waitForExpectations(timeout: asyncTimeout) { error in
            if let error = error {
                XCTFail("waitForExpectationsWithTimeout errored: \(error)")
            }
        }
    }
}
