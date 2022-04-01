import { CalendarView } from 'angular-calendar';
import { isSameMonth } from 'date-fns';

import { Component } from '@angular/core';
import { DateFormatMonthYear } from '@shared/constants';
import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RedColor } from '@shared/colors';
import { User } from '@redrock/models/user';
import { Event } from '@redrock/models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public readonly DateFormat = DateFormatMonthYear;
  public readonly WeekStartsOnMondayConfiguration = 1;
  public readonly CalendarView = CalendarView;

  public viewDate: Date = new Date();
  public events: Event[] = [];

  private readonly User: User = {
    id: 0,
    name: 'Tamas',
    color: RedColor,
  };

  constructor(public dialog: MatDialog) {}

  public dayClicked({ date }: { date: Date }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.openDialog(date);
      this.viewDate = date;
    }
  }

  public addEvent(startDate: Date, endDate: Date): void {
    this.events = [
      ...this.events,
      new Event(this.User.name, startDate, endDate, this.User.color),
    ];
  }

  public deleteEvent(eventToDelete: Event): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  private openDialog(date: Date): void {
    let userEvent: Event | undefined = this.events.find((event) =>
      event.isEventEqual(this.User.name, date)
    );

    //---------------------------------------------------------------------------------------
    //TODO: Refactor this part
    let startTime: Date;
    let endTime: Date;
    let eventExists: boolean;
    if (userEvent !== undefined) {
      this.events = this.events.filter((event) => event !== userEvent);
      startTime = userEvent.start;
      endTime = userEvent.end;
      eventExists = true;
    } else {
      startTime = new Date();
      endTime = new Date();
      eventExists = false;
    }
    //---------------------------------------------------------------------------------------

    let popupObject = new PopupDataObject(this.User.name, this.formatTime(startTime), this.formatTime(endTime), date, eventExists, false)

    const dialogRef = this.dialog.open(EditDayPopupComponent, {
      data: popupObject
    });

    dialogRef.afterClosed().subscribe((result) => {
      //---------------------------------------------------------------------------------------
      //TODO: Refactor this part
      if (result) {
        if (result.deleteEvent && userEvent !== undefined) {
          this.deleteEvent(userEvent);
        } else {
          let startDate: Date = this.addTimeToDate(result.startTime, date);
          let endDate: Date = this.addTimeToDate(result.endTime, date);
          this.addEvent(startDate, endDate);
        }
      } else {
        if (userEvent !== undefined) {
          this.events = [...this.events, userEvent];
        }
      }
      //---------------------------------------------------------------------------------------
    });
  }

  private addTimeToDate(time: string, date: Date): Date {
    let decomposed_time: string[] = time.split(':');
    let hour: number = parseInt(decomposed_time[0]);
    let minute: number = parseInt(decomposed_time[1]);
    let newDate: Date = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    return newDate;
  }

  private formatTime(time: Date): string {
    return time.getHours() + ':' + time.getMinutes();
  }
}

export class PopupDataObject {
  constructor(
    public name: string,
    public startTime: string,
    public endTime: string,
    public date: Date,
    public eventExists: boolean,
    public deleteEvent: boolean
  ) {}
}
