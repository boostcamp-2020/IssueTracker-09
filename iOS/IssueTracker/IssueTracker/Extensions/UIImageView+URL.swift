//
//  UIImageView+URL.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit

// MARK: - 이미지 뷰 URL 로드
extension UIImageView {
    func fromURL(url: String) {
        let url = URL(string: url)
        DispatchQueue.global().async {
            guard let data = try? Data(contentsOf: url!) else { return }
            DispatchQueue.main.async {
                self.image = UIImage(data: data)
            }
        }
        return
    }
}
