import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@redrock/app-routing.module';
import { AppComponent } from '@redrock/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '@redrock/interceptors/loading.interceptor';
import { BasicAuthInterceptor } from '@redrock/interceptors/basic-auth.interceptor';
import { UsersAPIClientModule } from '@redrock/generated-html-client/services/users';
import { environment } from 'environments/environment';
import { EventsAPIClientModule } from '@redrock/generated-html-client/services/events';
import { CalendarRoutesParts } from '@redrock/calendar/calendar-routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UsersAPIClientModule.forRoot({
      domain: environment.serverUrl,
      httpOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    }),
    EventsAPIClientModule.forRoot({
      domain: environment.serverUrl,
      httpOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: CalendarRoutesParts.calendar,
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      { path: '**', redirectTo: CalendarRoutesParts.calendar },
    ]),
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
