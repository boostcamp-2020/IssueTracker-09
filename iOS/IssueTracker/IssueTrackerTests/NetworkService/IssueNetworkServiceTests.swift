//
//  IssueNetworkServiceTests.swift
//  IssueTrackerTests
//
//  Created by 현기엽 on 2020/11/05.
//

import Foundation

import XCTest
@testable import IssueTracker

class IssueNetworkServiceTests: XCTestCase {
    let asyncTimeout: TimeInterval = 1
    static let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA0NTYwNjIxfQ.9ArX8vJLN6GuseS5tnDr3f_iH2Z925f6Iy68jHrijpo"
    static var originalToken: String?
    
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
    
    func testFetchIssues() throws {
        let expectTimer = expectation(description: "testFetchLabels")
        
        IssueNetworkService().fetchIssues { result in
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
    
    func testFetchIssuesByCondition() throws {
        let expectTimer = expectation(description: "testFetchIssuesByCondition")
        let joojaewoo = User(id: 0, name: "joojaewoo", image: "", userCode: nil)
        let query = IssueFilterQuery(isOpen: true, author: joojaewoo, assignee: joojaewoo)
        IssueNetworkService().fetchIssues(query: query) { result in
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
