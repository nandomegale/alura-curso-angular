import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: 'signin.component.html',
})
export class SignInComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup = new FormGroup({});
  @ViewChild('userNameInput')
  userNameInput!: ElementRef<HTMLInputElement>;
  fromUrl: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.fromUrl = params['fromUrl'];
    });
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.userNameInput?.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this._authService.authenticate(userName, password).subscribe({
      next: () => {
        this.fromUrl
          ? this._router.navigateByUrl(this.fromUrl)
          : this._router.navigate(['user/', userName]);
      },
      error: (err) => {
        console.log(err);
        this.loginForm.reset();
        this.userNameInput?.nativeElement.focus();
        alert('invalid username or password');
      },
    });
  }
}
