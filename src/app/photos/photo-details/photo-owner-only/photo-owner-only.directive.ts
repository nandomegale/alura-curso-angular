import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { IPhoto } from '../../photo/photo.model';

@Directive({ selector: '[photoOwnerOnly]' })
export class PhotoOwnerOnlyDirective implements OnInit {
  @Input() ownedPhoto: IPhoto;
  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this._userService.getUser().subscribe({
      next: (user) => {
        if (!user || user.id != this.ownedPhoto.userId) {
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
      },
    });
  }
}
