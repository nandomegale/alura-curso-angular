import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { read } from 'fs';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
})
export class PhotoFormComponent implements OnInit {
  photoForm: FormGroup = new FormGroup({});
  file!: File;
  preview!: string;

  constructor(
    private _formBuild: FormBuilder,
    private _photoService: PhotoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.photoForm = this._formBuild.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const dados = this.photoForm.getRawValue();
    this._photoService
      .upload(dados.description, dados.allowComments, this.file)
      .subscribe({
        next: () => {
          this._router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
    }
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(this.file)
  }
}
