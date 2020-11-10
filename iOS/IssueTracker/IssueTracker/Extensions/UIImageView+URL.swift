//
//  UIImageView+URL.swift
//  IssueTracker
//
//  Created by Seungeon Kim on 2020/11/09.
//

import UIKit
import AlamofireImage

// MARK: - 이미지 뷰 URL 로드
extension UIImageView {
    func fromURL(_ url: String) {
        let placeholderImage = UIImage(named: "github")
        guard let url = URL(string: url) else {
            return self.image = placeholderImage
        }
        
        self.af.setImage(withURL: url, placeholderImage: placeholderImage)
        return
    }
}
