import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ap-vmessage',
  templateUrl: 'vmessage.component.html',
})
export class VMessageComponent implements OnInit {
  @Input() text = '';

  constructor() {}

  ngOnInit() {}
}
