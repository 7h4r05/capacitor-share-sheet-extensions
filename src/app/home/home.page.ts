import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ios = false;
  android = false;
  constructor(platform: Platform) {
    this.ios = platform.is('ios');
    this.android = platform.is('android');
  }
}
