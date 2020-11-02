//
//  ImageNetworkServiceTests.swift
//  IssueTrackerTests
//
//  Created by 현기엽 on 2020/11/02.
//

import XCTest
@testable import IssueTracker

class ImageNetworkServiceTests: XCTestCase {
    let asyncTimeout: TimeInterval = 1
    static let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA0MzI2ODY1LCJleHAiOjE2MDQzMzQwNjV9.yZ6tKcK2Tndm6dkseCRZQwk9FXause08HcUSDtbaSmc"
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
    
    func testUploadImage() throws {
        let expectTimer = expectation(description: "testUploadImage")
        let image = UIImage(systemName: "trash")!
        
        ImageNetworkService().uploadImage(image) { result in
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
