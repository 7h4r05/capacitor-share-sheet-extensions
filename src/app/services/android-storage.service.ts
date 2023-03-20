import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import * as uuid from 'uuid';

export class AndroidCategory {
  id: number = -1;
  name: string = '';
  images: string[] = [];
}

@Injectable({
  providedIn: 'root',
})
export class AndroidStorageService {
  constructor() {
    Filesystem.mkdir({
      path: 'images',
      directory: Directory.Data,
    })
      .then(() => {})
      .catch(() => {});
  }

  async getCategories(): Promise<AndroidCategory[]> {
    const categoriesPreference = await Preferences.get({
      key: 'categories',
    });
    let categories = [];
    try {
      categories = JSON.parse(categoriesPreference.value as string);
    } catch (e) {
      categories = [];
    }

    return categories;
  }

  async saveFile(source: string) {
    const filename = `images/${uuid.v4()}.jpg`;
    const read = await Filesystem.readFile({
      path: source,
    });

    const result = await Filesystem.writeFile({
      path: filename,
      directory: Directory.Data,
      data: read.data,
    });
    return result.uri;
  }

  async setCategories(categories: AndroidCategory[]) {
    await Preferences.set({
      key: 'categories',
      value: JSON.stringify(categories),
    });
  }
}
