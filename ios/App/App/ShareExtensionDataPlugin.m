//
//  ShareExtensionDataPlugin.m
//  App
//
//  Created by Dariusz Zabrzeński on 18/02/2023.
//


#import <Capacitor/Capacitor.h>

CAP_PLUGIN(ShareExtensionDataPlugin, "ShareExtensionDataPlugin",
           CAP_PLUGIN_METHOD(read, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clear, CAPPluginReturnPromise);
)
