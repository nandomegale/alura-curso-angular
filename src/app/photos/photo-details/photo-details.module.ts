import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';

import { PhotoDetailsComponent } from './photo-details.component';

@NgModule({
  imports: [CommonModule, PhotoModule, RouterModule],
  exports: [PhotoDetailsComponent],
  declarations: [PhotoDetailsComponent, PhotoCommentsComponent],
  providers: [],
})
export class PhotoDetailsModule {}
