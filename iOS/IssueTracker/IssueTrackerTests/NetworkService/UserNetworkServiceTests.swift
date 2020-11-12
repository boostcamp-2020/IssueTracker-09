//
//  UserNetworkServiceTests.swift
//  IssueTrackerTests
//
//  Created by 현기엽 on 2020/11/09.
//

import Foundation

import XCTest
@testable import IssueTracker

class UserNetworkServiceTests: XCTestCase {
    let asyncTimeout: TimeInterval = 5
    static let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA1MTAzMzU3fQ.4m_c_41zyez5KugqZlY2Xnt50zzcHDGGgbAfgBJOqxM"
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
}
