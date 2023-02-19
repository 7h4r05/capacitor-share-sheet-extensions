//
//  ShareViewController.swift
//  Share
//
//  Created by Dariusz Zabrzeński on 16/02/2023.
//

import UIKit
import Social
import UniformTypeIdentifiers

class ShareViewController: SLComposeServiceViewController {
    
    override func isContentValid() -> Bool {
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func didSelectPost() {
        let attachments = (self.extensionContext?.inputItems.first as? NSExtensionItem)?.attachments ?? []
        let imageType = UTType.jpeg.identifier as String
        
        for provider in attachments {
            if provider.hasItemConformingToTypeIdentifier(imageType) {
                provider.loadItem(forTypeIdentifier: imageType,
                                  options: nil) { (data, error) in
                    guard error == nil else { return }
                    
                    if let imageURL = data as? NSURL {
                        let sdm = ShareDataManager()
                        
                        let uiImage = UIImage(contentsOfFile: imageURL.path!)!
                        
                        let filmeManager = FileManager()
                        let fileExists = filmeManager.fileExists(atPath: imageURL.path!)
                        print("File exists \(fileExists)")
                        let data = uiImage.jpegData(compressionQuality: 1.0)?.base64EncodedString() ?? ""
                        
                        sdm.write(image: "data:image/jpeg;base64,\(data)", text: self.contentText)
                        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)

                    } else {
                        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                        fatalError("Impossible to save image")
                    }
                }
            } else if provider.hasItemConformingToTypeIdentifier(imageType) {
                provider.loadItem(forTypeIdentifier: imageType,
                                  options: nil) { (data, error) in
                    
                }
            }else {
                self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
            }
        }
        if attachments.count == 0 {
            self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
        }
    }
    
    override func configurationItems() -> [Any]! {
        return []
    }
}
