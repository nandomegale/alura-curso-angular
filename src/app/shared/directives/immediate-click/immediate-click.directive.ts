import { Directive, ElementRef, OnInit } from '@angular/core';

//não funciona para novos navegadores
@Directive({
  selector: '[immediateClick]',
})
export class ImmediateClickDirective implements OnInit {
  constructor(private element: ElementRef<any>) {}
  ngOnInit() {
    this.element.nativeElement.click();
  }
}
