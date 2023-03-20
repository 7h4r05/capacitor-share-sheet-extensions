package com.example.app;

import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(ShareSheetPlugin.class);

    super.onCreate(savedInstanceState);
    var intent = getIntent();
    if (intent != null){
      var plugin = (ShareSheetPlugin)bridge.getPlugin("ShareSheetPlugin").getInstance();
      new IntentHandler(intent, this.getContentResolver(), plugin).handle();
    }
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    var plugin = (ShareSheetPlugin)bridge.getPlugin("ShareSheetPlugin").getInstance();
    new IntentHandler(intent, this.getContentResolver(), plugin).handle();
  }
}
