import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { CalendarAppComponent } from './calendar-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { CalendarModule as CalendarModule_original, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDayPopupComponent } from './components/edit-day-popup/edit-day-popup.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';



@NgModule({
  declarations: [CalendarAppComponent, ToolbarComponent, SidePanelComponent, CalendarComponent, EditDayPopupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CalendarModule_original.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: CalendarAppComponent}
    ]),
    NgxMaterialTimepickerModule
  ]
})
export class CalendarModule { }
