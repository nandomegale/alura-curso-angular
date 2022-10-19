import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-details',
  templateUrl: 'photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit {
  photo$: Observable<IPhoto>;
  photoId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService,
    private _router: Router,
    private _alertService: AlertService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.photoId = this._activatedRoute.snapshot.params['photoId'];
    this.photo$ = this._photoService.findById(this.photoId);
    this.photo$.subscribe({
      error: (err) => {
        console.log(err);
        this._router.navigate(['not-found']);
      },
    });
  }

  remove() {
    this._photoService.removePhoto(this.photoId).subscribe({
      next: () => {
        this._alertService.success('Photo removed!', true);
        this._router.navigate(['/user', this._userService.getUserName()], {
          replaceUrl: true,
        });
      },
      error: (err) => {
        this._alertService.warning('Could not delete photo!', true);
      },
    });
  }

  like(photo: IPhoto) {
    this._photoService.like(photo.id).subscribe({
      next: (liked) => {
        if (liked) {
          this.photo$ = this._photoService.findById(photo.id);
        }
      },
    });
  }
}
