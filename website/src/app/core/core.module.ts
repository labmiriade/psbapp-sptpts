import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptorService } from './interceptors/base-url-interceptor.service';
import { EnvironmentService } from './services/environment.service';

function initApp(envService: EnvironmentService) {
  return () =>
    envService.init().then((value) => {
      envService.environment = value;
      return value;
    });
}

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [EnvironmentService],
      multi: true,
    },
  ],
})
export class CoreModule {}
