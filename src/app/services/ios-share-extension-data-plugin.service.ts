import { Injectable } from '@angular/core';
import { Capacitor, registerPlugin } from '@capacitor/core';

const _pluginName: string = 'ShareExtensionDataPlugin';

export class IosShareData {
  items: IosShareDataItem[] = [];
}
export class IosShareDataItem {
  text: string = '';
  image: string = '';
  categoryId: number = -1;
}

export interface IosShareExtensionDataPlugin {
  clear(): Promise<void>;
  read(): Promise<IosShareData>;
}
const ShareExtensionDataPlugin =
  registerPlugin<IosShareExtensionDataPlugin>(_pluginName);

@Injectable({
  providedIn: 'root',
})
export class IosShareExtensionDataPluginService {
  async clear(): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      await ShareExtensionDataPlugin.clear();
    }
  }

  async read(): Promise<IosShareDataItem[] | null> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return (await ShareExtensionDataPlugin.read())?.items ?? null;
    }
    return null;
  }
}
