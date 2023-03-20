import { Injectable } from '@angular/core';
import { Capacitor, registerPlugin } from '@capacitor/core';

const _pluginName: string = 'CategoriesManagerPlugin';

export class IosCategories {
  items: IosCategory[] = [];
}
export class IosCategory {
  id: number = -1;
  text: string = '';
}

export interface IosCategoriesManagerPlugin {
  add(category: { text: string }): Promise<void>;
  get(): Promise<IosCategories>;
  remove(category: { id: number }): Promise<void>;
}
const CategoriesManagerPlugin =
  registerPlugin<IosCategoriesManagerPlugin>(_pluginName);

@Injectable({
  providedIn: 'root',
})
export class IosCategoriesManagerPluginService {
  async add(text: string): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return await CategoriesManagerPlugin.add({ text });
    }
  }

  async read(): Promise<IosCategory[] | []> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return (await CategoriesManagerPlugin.get())?.items ?? [];
    }
    return [];
  }
  async remove(id: number): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      await CategoriesManagerPlugin.remove({ id });
    }
  }
}
