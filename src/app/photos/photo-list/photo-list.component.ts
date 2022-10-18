import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
})
export class PhotoListComponent implements OnInit {
  photos: IPhoto[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this._loadingService.start();
    this.userName = this._activatedRoute.snapshot.params['userName'];
    this.photos = this._activatedRoute.snapshot.data['photos'];
    //solução para Angular versão mais antiga
    // this._activatedRoute.params.subscribe({
    //   next: (params) => {
    //     this.userName = params['userName'];
    //     this.photos = params['photos'];
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  load() {
    this._photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      });
  }
}
