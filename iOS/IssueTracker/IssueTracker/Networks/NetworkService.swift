//
//  NetworkService.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/02.
//

import Foundation

enum NetworkError: Error {
    case param, server, data, unknown
    
    var localizedDescription: String {
        switch self {
        case .param:
            return "잘못된 파라미터 입니다."
        case .server:
            return "서버 호출 실패하였습니다."
        case .data:
            return "데이터가 없습니다."
        case .unknown:
            return "알 수 없는 에러입니다."
        }
    }
}

class NetworkService {
    let baseURL: String = "http://49.50.172.108:3000/api"
}
