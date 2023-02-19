//
//  ShareExtensionDataPlugin.swift
//  App
//
//  Created by Dariusz Zabrzeński on 18/02/2023.
//

import Capacitor

import UniformTypeIdentifiers


@objc(ShareExtensionDataPlugin)
public class ShareExtensionDataPlugin: CAPPlugin {
    @objc func clear(_ call: CAPPluginCall) {
        let sdm = ShareDataManager()
        sdm.clear()
        call.resolve()
    }
    
    @objc func read(_ call: CAPPluginCall) {
        let sdm = ShareDataManager()
        let data = sdm.read()
        var result:[Any] = []
        
        let fileManager = FileManager()
        
        for item in data.items {
            let itemDict = [
                "text": item.text,
                "image": item.image
            ]
            result.append(itemDict)
        }
        
        call.resolve(["items": result])
    }
}

