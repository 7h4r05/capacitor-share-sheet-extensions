//
//  CategoriesManagerPlugin.m
//  App
//
//  Created by Dariusz Zabrzeński on 01/03/2023.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(CategoriesManagerPlugin, "CategoriesManagerPlugin",
           CAP_PLUGIN_METHOD(add, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(get, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(remove, CAPPluginReturnNone);
)
