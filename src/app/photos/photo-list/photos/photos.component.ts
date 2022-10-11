import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IPhoto } from '../../photo/photo.model';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnChanges {
  @Input() photos: IPhoto[] = [];

  rows: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['photos']) {
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: IPhoto[]) {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }
}
