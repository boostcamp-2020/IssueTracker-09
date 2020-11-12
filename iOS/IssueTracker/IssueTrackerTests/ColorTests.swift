//
//  ColorTests.swift
//  IssueTrackerTests
//
//  Created by 현기엽 on 2020/11/12.
//

import XCTest
@testable import IssueTracker

class ColorTests: XCTestCase {
    func testHexStringToColor() {
        let red = UIColor(hexString: "#ff0000")
        XCTAssertEqual(red, UIColor.red)
    }
    
    func testColorToHexString() {
        let redHexString = UIColor.red.toHexString()
        XCTAssertEqual(redHexString, "#ff0000")
    }
}
