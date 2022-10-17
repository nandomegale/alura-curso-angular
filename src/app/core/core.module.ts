import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RequestInterceptor } from './interceptors/request.interceptor';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
