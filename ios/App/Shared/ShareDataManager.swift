//
//  ShareDataManager.swift
//  App
//
//  Created by Dariusz Zabrzeński on 17/02/2023.
//

import Foundation
import UIKit
import Social
import UniformTypeIdentifiers

class ShareData: Encodable, Decodable{
    var items: [ShareDataItem]
    
    init() {
        items = []
    }
    
    init(val: [ShareDataItem]){
        self.items = val
    }
}

class ShareDataItem: Encodable, Decodable {
    var text: String
    var image: String
    
    init(text: String, image: String) {
        self.text = text
        self.image = image
    }
}

class ShareDataManager {
    let file = "share.json"
    
    fileprivate func sharedContainerURL() -> URL? {
        let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.modista.capacitor.share.example")
        return groupURL
    }
    
    func clear() {
        let data = ShareData()
        
        do {
            if let dir = sharedContainerURL() {
                let fileURL = dir.appendingPathComponent(file)
                let encoder = JSONEncoder()
                
                let json = try encoder.encode(data)
                try json.write(to: fileURL)
                
            }
        } catch {
            print("error:\(error)")
        }
    }
    
    func read() -> ShareData {
        if let dir = sharedContainerURL()  {
            
            let filename = dir.appendingPathComponent(file)
            do {
                let data = try Data(contentsOf: filename)
                let decoder = JSONDecoder()
                let jsonData = try decoder.decode(ShareData.self, from: data)
                return jsonData
            } catch {
                print("error:\(error)")
                
                return ShareData()
            }
        }
        return ShareData()
    }
    
    func write(image: String,
               text: String) {
        do {
            if let dir = self.sharedContainerURL()  {
                let jsonURL = dir.appendingPathComponent(file)
                let encoder = JSONEncoder()
                let data = self.read()
                let item = ShareDataItem(text: text, image: image)
                
                
                data.items.append(item)
                let json = try encoder.encode(data)
                try json.write(to: jsonURL)
            }
        }
        catch {
            print("error:\(error)")
        }
    }
}



