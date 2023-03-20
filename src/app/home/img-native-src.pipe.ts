import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgNativeSrc',
})
export class ImgNativeSrcPipe implements PipeTransform {
  transform(url: string) {
    return (<any>window).Ionic.WebView.convertFileSrc(url);
  }
}
