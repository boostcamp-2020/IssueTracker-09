//
//  DataRequest+responseBool.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Alamofire

extension DataRequest {
    @discardableResult
    func responseBool(queue: DispatchQueue = .main,
                      dataPreprocessor: DataPreprocessor = JSONResponseSerializer.defaultDataPreprocessor,
                      emptyResponseCodes: Set<Int> = JSONResponseSerializer.defaultEmptyResponseCodes,
                      emptyRequestMethods: Set<HTTPMethod> = JSONResponseSerializer.defaultEmptyRequestMethods,
                      options: JSONSerialization.ReadingOptions = .allowFragments,
                      completionHandler: @escaping (Result<Bool, Error>) -> Void) -> Self {
        responseJSON (queue: queue, dataPreprocessor: dataPreprocessor, emptyResponseCodes: emptyResponseCodes, emptyRequestMethods: emptyRequestMethods, options: options){ response in
            switch response.result {
            case .success(let value):
                guard let value = value as? [String: Any],
                      let response = value["response"] as? Bool else {
                    completionHandler(.failure(NetworkError.response))
                    return
                }
                completionHandler(.success(response))
            case .failure(let error):
                completionHandler(.failure(error))
            }
        }
    }
}
