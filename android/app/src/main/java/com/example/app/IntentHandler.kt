package com.example.app

import android.content.ContentResolver
import android.content.Intent
import android.net.Uri
import android.util.Log
import java.io.IOException


class IntentHandler {
  private val intent: Intent
  private val contentResolver: ContentResolver
  private val plugin: ShareSheetPlugin

  constructor(intent: Intent, contentResolver: ContentResolver, plugin: ShareSheetPlugin){
    this.intent = intent
    this.contentResolver = contentResolver
    this.plugin = plugin
  }

  fun handle() {
    if (this.intent.action != Intent.ACTION_SEND){
      // Ignore, we will support one case for now
      return;
    }
    val imageUri = intent.getParcelableExtra<Uri>(Intent.EXTRA_STREAM)
    if (imageUri == null) {
      Log.e("Capacitor share extension", "Invalid image")
      return;
    }
    try {
      plugin.notifyImageReceived(imageUri.toString())
    } catch (e: IOException) {
      e.printStackTrace()
    }
  }
}
