import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-footer',
  templateUrl: 'footer.component.html',
})
export class FooterComponent implements OnInit {
  user$!: Observable<IUser | null>;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.user$ = this._userService.getUser();
  }
}
