//
//  LabelNetworkServiceTests.swift
//  IssueTrackerTests
//
//  Created by 현기엽 on 2020/11/02.
//

import XCTest
@testable import IssueTracker

class LabelNetworkServiceTests: XCTestCase {
    let asyncTimeout: TimeInterval = 1
    
    func testAddLabel() throws {
        let expectTimer = expectation(description: "testAddLabel")
        LabelNetworkService().addLabel(color: .black, title: "test", content: "testContent") { result in
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
    
    func testFetchLabels() throws {
        let expectTimer = expectation(description: "testFetchLabels")
        LabelNetworkService().fetchLabels { result in
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
