import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';
import { RouterModule } from '@angular/router';
import { CalendarAppComponent } from '@redrock/calendar/calendar-app.component';
import { ToolbarComponent } from '@redrock/calendar/components/toolbar/toolbar.component';
import { SidePanelComponent } from '@redrock/calendar/components/side-panel/side-panel.component';
import { CalendarComponent } from '@redrock/calendar/components/calendar/calendar.component';

import {
  CalendarModule as AngularCalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LoginComponent } from '@redrock/calendar/components/login/login.component';
import { LoginGuardGuard } from '@redrock/login-guard.guard';

@NgModule({
  declarations: [
    CalendarAppComponent,
    ToolbarComponent,
    SidePanelComponent,
    CalendarComponent,
    EditDayPopupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [LoginGuardGuard],
        component: CalendarAppComponent,
      },
      { path: 'login', component: LoginComponent },
    ]),
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
  ],
})
export class CalendarModule {}
