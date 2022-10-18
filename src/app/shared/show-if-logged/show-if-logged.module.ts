import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShowIfLoggedDirective } from './show-if-logged.directive';

@NgModule({
  imports: [CommonModule],
  exports: [ShowIfLoggedDirective],
  declarations: [ShowIfLoggedDirective],
})
export class ShowIfLoggedModule {}
