//
//  ImageNetworkService.swift
//  IssueTracker
//
//  Created by 현기엽 on 2020/11/02.
//

import Foundation
import Alamofire

class ImageNetworkService: NetworkService {
    enum Endpoint: String {
        case image = "/image"
    }
    
    func uploadImage(_ image: UIImage, name: String, completion handler: @escaping (Result<URL, Error>) -> Void) {
        guard let url = URL(string: baseURL + Endpoint.image.rawValue),
              let token = PersistenceManager.shared.load(forKey: .token),
              let imageData = image.jpegData(compressionQuality: 1) else {
            return
        }
        
        let headers: HTTPHeaders = [.authorization(bearerToken: token)]
        
        AF.upload(
            multipartFormData: { data in
                data.append(imageData, withName: "img", fileName: name, mimeType: "image/jpeg")
            },
            to: url,
            headers: headers
        )
        .validate()
        .responseJSON { response in
            switch response.result {
            case .success(let dictionary):
                guard let dictionary = dictionary as? [String: Any],
                      let fileURL = dictionary["imageURL"] as? String,
                      let url = URL(string: fileURL) else {
                    handler(.failure(NetworkError.response))
                    return
                }
                handler(.success(url))
            case .failure(let error):
                handler(.failure(error))
            }
        }
    }
}
