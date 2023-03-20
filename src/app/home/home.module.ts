import { AndroidCategoriesComponent } from './android-categories/android-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InCategoryPipe } from './in-category.pipe';
import { IosCategoriesComponent } from './ios-categories/ios-categories.component';
import { AndroidShareHandlerModal } from './android-categories/android-share-handler/android-share-handler.modal';
import { ImgNativeSrcPipe } from './img-native-src.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    IosCategoriesComponent,
    AndroidShareHandlerModal,
    AndroidCategoriesComponent,
    HomePage,
    InCategoryPipe,
    ImgNativeSrcPipe,
  ],
})
export class HomePageModule {}
