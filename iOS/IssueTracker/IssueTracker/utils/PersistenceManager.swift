//
//  PersistenceManager.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import Foundation
import KeychainSwift


enum Keys: String {
    case token
    case name
    case id
}

class PersistenceManager {
    static let shared: PersistenceManager = PersistenceManager()
    
    private init() { }
    
    @discardableResult
    func save(_ token: String, forKey: Keys) -> Bool {
        return KeychainSwift().set(token, forKey: forKey.rawValue)
    }
    
    func load(forKey: Keys) -> String? {
        return KeychainSwift().get(forKey.rawValue)
    }
}
