import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  AndroidSharedImage,
  AndroidShareSheetPluginService,
} from 'src/app/services/android-share-sheet-plugin.service';
import {
  AndroidCategory,
  AndroidStorageService,
} from 'src/app/services/android-storage.service';
import { AndroidShareHandlerModal } from './android-share-handler/android-share-handler.modal';

@Component({
  templateUrl: 'android-categories.component.html',
  selector: 'rd-android-categories',
})
export class AndroidCategoriesComponent {
  categories: AndroidCategory[] = [];
  categoryName = '';
  sharedImage: string | null = null;
  url: string | null = null;
  constructor(
    private shareSheetPluginService: AndroidShareSheetPluginService,
    private androidStorageManager: AndroidStorageService,
    private modalController: ModalController,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.load();
    this.shareSheetPluginService
      .watch()
      .subscribe(async (data: AndroidSharedImage) => {
        if (data && data.uri) {
          const modal = await this.modalController.create({
            component: AndroidShareHandlerModal,
            componentProps: {
              uri: data.uri,
              categories: this.categories,
            },
          });
          modal.onDidDismiss().then(async () => {
            await this.load();
          });
          await modal.present();
        }
      });
  }

  async add() {
    if (!this.categoryName || this.categoryName.length < 1) {
      return;
    }
    const lastId =
      this.categories && this.categories.length > 0
        ? this.categories.sort((a, b) => (a.id >= b.id ? -1 : 1))[0].id + 1
        : 1;
    this.categories.push({
      id: lastId,
      name: this.categoryName,
      images: [],
    });
    await this.androidStorageManager.setCategories(this.categories);
    this.categoryName = '';
  }

  async load() {
    this.categories = await this.androidStorageManager.getCategories();
    this.cd.detectChanges();
  }

  async remove(id: number) {
    this.categories = this.categories.filter((c) => c.id !== id);
    await this.androidStorageManager.setCategories(this.categories);
  }
}
