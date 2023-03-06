import { Injectable } from '@angular/core';
import { Capacitor, registerPlugin } from '@capacitor/core';

const _pluginName: string = 'ShareExtensionDataPlugin';

export class ShareData {
  items: ShareDataItem[] = [];
}
export class ShareDataItem {
  text: string = '';
  image: string = '';
  categoryId: number = -1;
}

export interface ShareExtensionDataPlugin {
  clear(): Promise<void>;
  read(): Promise<ShareData>;
}
const ShareExtensionDataPlugin =
  registerPlugin<ShareExtensionDataPlugin>(_pluginName);

@Injectable({
  providedIn: 'root',
})
export class ShareExtensionDataPluginService {
  async clear(): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      await ShareExtensionDataPlugin.clear();
    }
  }

  async read(): Promise<ShareDataItem[] | null> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return (await ShareExtensionDataPlugin.read())?.items ?? null;
    }
    return null;
  }
}
