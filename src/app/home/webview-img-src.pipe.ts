import { IosShareDataItem } from './../services/ios-share-extension-data-plugin.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgNativeSrc',
})
export class ImgNativeSrc implements PipeTransform {
  transform(url: string) {
    return (<any>window).Ionic.WebView.convertFileSrc(url);
  }
}
