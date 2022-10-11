import { Pipe, PipeTransform } from '@angular/core';
import { IPhoto } from '../photo/photo.model';

@Pipe({
  name: 'filterByDescription',
})
export class FilterByDescriptionPipe implements PipeTransform {
  transform(photos: IPhoto[], descriptionQuery: string) {
    descriptionQuery = descriptionQuery.trim().toLowerCase();
    if (descriptionQuery) {
      return photos.filter((photo) =>
        photo.description.toLowerCase().includes(descriptionQuery)
      );
    } else {
      return photos;
    }
  }
}
