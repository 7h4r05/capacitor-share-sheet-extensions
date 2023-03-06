//
//  CategoriesManager.swift
//  App
//
//  Created by Dariusz Zabrzeński on 01/03/2023.
//

import Foundation

class Categories: Encodable, Decodable{
    var items: [Category]
    
    init() {
        items = []
    }
    
    init(val: [Category]){
        self.items = val
    }
}

class Category: Encodable, Decodable {
    var id: Int
    var text: String
    
    init(id: Int, text: String) {
        self.text = text
        self.id = id
    }
}

class CategoriesManager {
    let file = "categories.json"
    
    fileprivate func sharedContainerURL() -> URL? {
        let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.modista.capacitor.share.example")
        return groupURL
    }
    
    func get() -> Categories {
        if let dir = sharedContainerURL()  {
            let filename = dir.appendingPathComponent(file)
            do {
                let data = try Data(contentsOf: filename)
                let decoder = JSONDecoder()
                let jsonData = try decoder.decode(Categories.self, from: data)
                return jsonData
            } catch {
                print("error:\(error)")
                
                return Categories()
            }
        }
        return Categories()
    }
    
    func add(text: String) {
        do {
            if let dir = self.sharedContainerURL()  {
                let jsonURL = dir.appendingPathComponent(file)
                let encoder = JSONEncoder()
                let data = self.get()
                let lastId = data.items.sorted(by: { l, r in
                    return l.id > r.id
                }).first?.id ?? 0
                
                let item = Category(id: lastId + 1, text: text)
                
                
                data.items.append(item)
                let json = try encoder.encode(data)
                try json.write(to: jsonURL)
            }
        }
        catch {
            print("error:\(error)")
        }
    }
    
    func remove(id: Int){
        do {
            if let dir = self.sharedContainerURL()  {
                let jsonURL = dir.appendingPathComponent(file)
                let encoder = JSONEncoder()
                let data = self.get()
                
                data.items = data.items.filter({ c in
                    return c.id != id
                })
                
                let json = try encoder.encode(data)
                try json.write(to: jsonURL)
            }
        }
        catch {
            print("error:\(error)")
        }
    }
}
