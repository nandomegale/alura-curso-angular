import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this._activatedRoute))
      .pipe(
        map((route: any) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )

      .pipe(switchMap((route: any) => route.data))
      .subscribe((event: any) => this._titleService.setTitle(event.title));
  }
}
