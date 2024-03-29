import { IosShareDataItem } from './../services/ios-share-extension-data-plugin.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inCategory',
})
export class InCategoryPipe implements PipeTransform {
  transform(items: IosShareDataItem[], categoryId: number) {
    return items?.filter((i) => i && i.categoryId === categoryId);
  }
}
