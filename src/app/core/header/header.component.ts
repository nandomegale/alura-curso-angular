import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user$: Observable<IUser | null>;
  user: IUser | null = null;

  constructor(private _userService: UserService, private _router: Router) {
    this.user$ = this._userService.getUser();
  }

  ngOnInit() {}

  logout() {
    this._userService.logout();
    this._router.navigate(['']);
  }
}
