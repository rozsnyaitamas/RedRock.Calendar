import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@redrock/app-routing.module';
import { AppComponent } from '@redrock/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggerInterceptor } from '@redrock/interceptors/logger.interceptor';
import { UsersAPIClientModule } from './generated-html-client/services/users';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UsersAPIClientModule.forRoot({
      domain: environment.serverUrl,
      httpOptions: {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      { path: '**', redirectTo: 'calendar' },
    ]),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
