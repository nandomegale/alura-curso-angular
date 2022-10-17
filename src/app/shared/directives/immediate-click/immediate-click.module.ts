import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImmediateClickDirective } from './immediate-click.directive';

@NgModule({
  imports: [CommonModule],
  exports: [ImmediateClickDirective],
  declarations: [ImmediateClickDirective],
})
export class ImmediateModule {}
