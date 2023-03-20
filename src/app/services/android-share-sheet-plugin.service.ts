import { Injectable } from '@angular/core';
import {
  Capacitor,
  PluginListenerHandle,
  PluginResultData,
  PluginResultError,
  registerPlugin,
} from '@capacitor/core';
import { Observable, Subject } from 'rxjs';

const _pluginName: string = 'ShareSheetPlugin';

export class AndroidSharedImage {
  uri: string = '';
}

export interface AndroidShareSheetPlugin {}
const ShareSheetPlugin = registerPlugin<AndroidShareSheetPlugin>(_pluginName);

@Injectable({
  providedIn: 'root',
})
export class AndroidShareSheetPluginService {
  private readonly _shareReceived = 'shared_image_received';
  private _share$: Subject<AndroidSharedImage> | null = null;
  private _shareHandler: PluginListenerHandle | null = null;

  watch(): Observable<AndroidSharedImage> {
    if (!this._share$) {
      this._share$ = new Subject<AndroidSharedImage>();
    } else {
      return this._share$;
    }
    if (
      Capacitor.isPluginAvailable(_pluginName) &&
      typeof Capacitor.addListener !== 'undefined'
    ) {
      this._shareHandler = Capacitor.addListener(
        _pluginName,
        this._shareReceived,
        (data: PluginResultData, error?: PluginResultError) => {
          const result: AndroidSharedImage = {
            uri: data['uri'],
          };
          this._share$?.next(result);
        }
      );
    }
    return this._share$;
  }

  async unsubscribe() {
    this._shareHandler?.remove();
    this._share$?.complete();
    this._share$ = null;
  }
}
