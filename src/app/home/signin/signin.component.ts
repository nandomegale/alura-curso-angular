import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: 'signin.component.html',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  @ViewChild('userNameInput')
  userNameInput: ElementRef<HTMLInputElement> | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this._authService.authenticate(userName, password).subscribe({
      complete: () => {
        console.log('autenticado');
        this._router.navigate(['user/', userName]);
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