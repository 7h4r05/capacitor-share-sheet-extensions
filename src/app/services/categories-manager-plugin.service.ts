import { Injectable } from '@angular/core';
import { Capacitor, registerPlugin } from '@capacitor/core';

const _pluginName: string = 'CategoriesManagerPlugin';

export class Categories {
  items: Category[] = [];
}
export class Category {
  id: number = -1;
  text: string = '';
}

export interface CategoriesManagerPlugin {
  add(category: { text: string }): Promise<void>;
  get(): Promise<Categories>;
  remove(category: { id: number }): Promise<void>;
}
const CategoriesManagerPlugin =
  registerPlugin<CategoriesManagerPlugin>(_pluginName);

@Injectable({
  providedIn: 'root',
})
export class CategoriesManagerPluginService {
  async add(text: string): Promise<void> {
    if (Capacitor.isPluginAvailable(_pluginName)) {
      return await CategoriesManagerPlugin.add({ text });
    }
  }

  async read(): Promise<Category[] | []> {
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
