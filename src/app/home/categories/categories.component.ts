import {
  ShareDataItem,
  ShareExtensionDataPluginService,
} from './../../services/share-extension-data-plugin.service';
import { Component } from '@angular/core';
import {
  CategoriesManagerPluginService,
  Category,
} from 'src/app/services/categories-manager-plugin.service';

@Component({
  templateUrl: 'categories.component.html',
  selector: 'rd-categories',
})
export class CategoriesComponent {
  categories: Category[] = [];
  sharedItems: ShareDataItem[] = [];
  categoryName = '';
  constructor(
    private categoriesManager: CategoriesManagerPluginService,
    private shareExtensionDataPluginService: ShareExtensionDataPluginService
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
