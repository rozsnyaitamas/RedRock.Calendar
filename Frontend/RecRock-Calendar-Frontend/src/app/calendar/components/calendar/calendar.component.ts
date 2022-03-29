import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, isSameMonth, startOfDay } from 'date-fns';

import { Component } from '@angular/core';
import { DateFormat } from '@shared/constants';
import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RedColor } from '@shared/colors';
import { User } from '@redrock/models/user';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public readonly DateFormat = DateFormat;
  public readonly WeekStartsOnMondayConfiguration = 1;
  public readonly  CalendarView = CalendarView;

  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];

  private readonly User: User = {
    id: 0,
    name: "Tamas",
    color: RedColor
  };

  constructor(public dialog: MatDialog) {}
  
  public dayClicked({ date }: { date: Date }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.openDialog(date);
      this.viewDate = date;
    }
  }

  public addEvent(date: Date): void {
    this.events = [
      ...this.events,
      {
        title: this.User.name,
        start: startOfDay(date),
        end: endOfDay(date),
        color: this.User.color,
      },
    ];
  }

  public deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  private openDialog(date: Date): void {
    const dialogRef = this.dialog.open(EditDayPopupComponent, {
      data: { name: this.User.name, date: date }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent(result.date);
      }
    });
  }
}
