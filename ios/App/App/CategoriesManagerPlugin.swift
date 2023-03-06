//
//  CategoriesManagerPlugin.swift
//  App
//
//  Created by Dariusz Zabrzeński on 01/03/2023.
//

import Capacitor


@objc(CategoriesManagerPlugin)
public class CategoriesManagerPlugin: CAPPlugin {
    @objc func add(_ call: CAPPluginCall) {
        let cm = CategoriesManager()
        
        let text = call.getString("text")!
        cm.add(text: text)
        call.resolve()
    }
    
    @objc func get(_ call: CAPPluginCall) {
        let cm = CategoriesManager()
        let data = cm.get()
        var result:[Any] = []
        
        for item in data.items {
            let itemDict: [String: Any] = [
                "text": item.text,
                "id": item.id
            ]
            result.append(itemDict)
        }
        
        call.resolve(["items": result])
    }
    
    @objc func remove(_ call: CAPPluginCall) {
        let cm = CategoriesManager()
        
        let id = call.getInt("id")!
        cm.remove(id: id)
        call.resolve()
    }
}

