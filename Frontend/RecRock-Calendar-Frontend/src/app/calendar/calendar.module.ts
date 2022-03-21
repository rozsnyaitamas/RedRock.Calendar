import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { CalendarAppComponent } from './calendar-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { CalendarComponent } from './components/calendar/calendar.component';



@NgModule({
  declarations: [CalendarAppComponent, ToolbarComponent, SidePanelComponent, CalendarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: CalendarAppComponent}
    ])
  ]
})
export class CalendarModule { }
