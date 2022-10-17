import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhotoComment } from '../../photo/photo.model';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: 'photo-comments.component.html',
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number;

  comments$: Observable<IPhotoComment[]>;

  constructor(private _photoService: PhotoService) {}

  ngOnInit() {
    this.comments$ = this._photoService.getComments(this.photoId);
  }
}
