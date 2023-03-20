package com.example.app

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "ShareSheetPlugin")
class ShareSheetPlugin : Plugin() {
  fun notifyImageReceived(uri: String) {
    val ret = JSObject()
    ret.put("uri", uri)
    notifyListeners("shared_image_received", ret)
  }
}
