import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-details',
  templateUrl: 'photo-details.component.html',
  styleUrls: ['photo-details.component.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  photo$: Observable<IPhoto>;
  photoId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService
  ) {}

  ngOnInit() {
    this.photoId = this._activatedRoute.snapshot.params['photoId'];
    this.photo$ = this._photoService.findById(this.photoId);
  }
}
