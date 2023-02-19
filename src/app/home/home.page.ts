import {
  ShareExtensionDataPluginService,
  ShareDataItem,
} from './../services/share-extension-data-plugin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: ShareDataItem[] = [];
  constructor(private shareService: ShareExtensionDataPluginService) {}

  async read() {
    let data = await this.shareService.read();
    this.data = data ?? [];
  }

  async clear() {
    await this.shareService.clear();
    this.data = [];
  }
}
