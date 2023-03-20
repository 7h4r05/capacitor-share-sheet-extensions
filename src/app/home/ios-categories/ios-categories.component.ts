import { Component } from '@angular/core';
import {
  IosCategoriesManagerPluginService,
  IosCategory,
} from 'src/app/services/ios-categories-manager-plugin.service';
import {
  IosShareDataItem,
  IosShareExtensionDataPluginService,
} from 'src/app/services/ios-share-extension-data-plugin.service';

@Component({
  templateUrl: 'ios-categories.component.html',
  selector: 'rd-ios-categories',
})
export class IosCategoriesComponent {
  categories: IosCategory[] = [];
  sharedItems: IosShareDataItem[] = [];
  categoryName = '';
  constructor(
    private categoriesManager: IosCategoriesManagerPluginService,
    private shareExtensionDataPluginService: IosShareExtensionDataPluginService
  ) {}

  async ngOnInit() {
    await this.load();
  }

  async add() {
    if (!this.categoryName || this.categoryName.length < 1) {
      return;
    }
    await this.categoriesManager.add(this.categoryName);
    await this.load();
    this.categoryName = '';
  }

  async load() {
    this.categories = await this.categoriesManager.read();
    this.sharedItems =
      (await this.shareExtensionDataPluginService.read()) ?? [];
  }

  async remove(id: number) {
    await this.categoriesManager.remove(id);
    await this.load();
  }
}
