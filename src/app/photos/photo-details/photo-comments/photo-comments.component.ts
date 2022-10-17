import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { IPhotoComment } from '../../photo/photo.model';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: 'photo-comments.component.html',
  styleUrls: ['photo-comments.component.scss'],
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number;
  commentForm: FormGroup;

  comments$: Observable<IPhotoComment[]>;

  constructor(
    private _photoService: PhotoService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.comments$ = this._photoService.getComments(this.photoId);
    this.commentForm = this._formBuilder.group({
      comment: [null, Validators.maxLength(300)],
    });
  }

  save() {
    this.comments$ = this._photoService
      .addComment(this.photoId, String(this.commentForm.get('comment').value))
      .pipe(switchMap(() => this._photoService.getComments(this.photoId)))
      .pipe(
        tap(() => {
          this.commentForm.reset();
        })
      );
  }
}
