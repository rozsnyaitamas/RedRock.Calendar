import { CalendarView } from 'angular-calendar';
import { isSameMonth } from 'date-fns';

import { Component } from '@angular/core';
import { DateFormatMonthYear } from '@shared/constants';
import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RedColor } from '@shared/colors';
import { User } from '@redrock/models/user';
import { Event } from '@redrock/models/event';
import { PopupDTO } from '../edit-day-popup/popup-dto';

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
    const userEvent: Event | undefined = this.events.find((event) =>
      event.isEventEqual(this.User.name, date)
    );

    const dialogRef = this.dialog.open(EditDayPopupComponent, {
      data: this.initialisePopupDTO(userEvent, date),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (userEvent !== undefined) {
        if (result.deleteEvent) {
          this.deleteEvent(userEvent);
        }
        if (result.noModification) {
          this.events = [...this.events, userEvent];
        }
      }
      if (result.saveEvent) {
        let startDate: Date = this.addTimeToDate(result.startTime, date);
        let endDate: Date = this.addTimeToDate(result.endTime, date);
        this.addEvent(startDate, endDate);
      }
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

  private initialisePopupDTO(
    userEvent: Event | undefined,
    date: Date
  ): PopupDTO {
    if (userEvent !== undefined) {
      this.events = this.events.filter((event) => event !== userEvent);
      return new PopupDTO(
        this.User.name,
        PopupDTO.formatTime(userEvent.start),
        PopupDTO.formatTime(userEvent.end),
        date,
        true,
        false,
        false,
        false
      );
    } else {
      return new PopupDTO(
        this.User.name,
        PopupDTO.formatTime(new Date()),
        PopupDTO.formatTime(new Date()),
        date,
        false,
        false,
        false,
        false
      );
    }
  }
}
