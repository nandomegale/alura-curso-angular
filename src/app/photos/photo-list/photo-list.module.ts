import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { PhotoModule } from '../photo/photo.module';
import { FilterByDescriptionPipe } from './filterByDescription.pipe';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    FilterByDescriptionPipe,
    SearchComponent,
  ],
  imports: [CommonModule, PhotoModule, CardModule],
  exports: [PhotosComponent],
})
export class PhotoListModule {}