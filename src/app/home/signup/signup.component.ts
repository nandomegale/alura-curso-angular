import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user.model';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-password.validator';

@Component({
  templateUrl: 'signup.component.html',
  providers: [UserNotTakenValidatorService],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  signupForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuild: FormBuilder,
    private _userNotTakenValidatorService: UserNotTakenValidatorService,
    private _signupService: SignUpService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this._formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        this._userNotTakenValidatorService.checkUserNameTaken(),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(18),
        ],
      ],
    },
    {
      validator: userNamePassword
    });
  }

  ngAfterViewInit() {
    this.emailInput.nativeElement.focus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this._signupService.signup(newUser).subscribe({
      next: () => {
        this._router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
