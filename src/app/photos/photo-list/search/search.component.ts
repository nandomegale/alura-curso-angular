import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe();
  }
  debounce: Subject<string> = new Subject<string>();

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  keyupEvent(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.debounce.next(value);
  }
}
