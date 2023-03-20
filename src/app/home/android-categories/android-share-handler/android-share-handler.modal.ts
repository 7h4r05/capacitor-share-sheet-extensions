import { AndroidStorageService } from './../../../services/android-storage.service';
import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { AndroidCategory } from 'src/app/services/android-storage.service';

@Component({
  templateUrl: './android-share-handler.modal.html',
  styleUrls: ['./android-share-handler.modal.scss'],
})
export class AndroidShareHandlerModal {
  @Input() uri: string = '';
  @Input() categories: AndroidCategory[] = [];
  imageUri: string = '';
  categorySelected: number = 0;
  constructor(
    private modal: ModalController,
    private androidStorageService: AndroidStorageService
  ) {}

  async ngOnInit() {
    if (!this.categories || this.categories.length === 0) {
      await this.modal.dismiss();
      return;
    }
    this.imageUri = (<any>window).Ionic.WebView.convertFileSrc(this.uri);
    this.categorySelected = this.categories[0].id;
  }

  async save() {
    const result = await this.androidStorageService.saveFile(this.uri);
    const categoryIndex = this.categories.findIndex(
      (c) => c.id === this.categorySelected
    );
    this.categories[categoryIndex].images.push(result);
    await this.androidStorageService.setCategories(this.categories);
    await this.modal.dismiss();
  }

  async cancel() {
    await this.modal.dismiss();
  }
}
