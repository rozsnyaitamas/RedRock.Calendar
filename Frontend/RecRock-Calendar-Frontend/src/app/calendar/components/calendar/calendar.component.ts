import { CalendarView } from 'angular-calendar';
import { isSameMonth } from 'date-fns';

import { Component, OnInit } from '@angular/core';
import { DateFormatMonthYear } from '@shared/constants';
import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { RedColor } from '@shared/colors';
import { User } from '@redrock/models/user';
import { Event } from '@redrock/models/event';
import { PopupModel } from '@redrock/models/popupModel';
import { DateTimeHelper } from '@shared/helpers/date-time.helper';
import { UserService } from '@redrock/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public readonly DateFormat = DateFormatMonthYear;
  public readonly WeekStartsOnMondayConfiguration = 1;
  public readonly CalendarView = CalendarView;

  public viewDate: Date = new Date();
  public events: Event[] = [];

  private user!: User;

  constructor(public readonly dialog: MatDialog, private readonly userService: UserService) {}

  ngOnInit(): void {
      this.userService
      .getById(sessionStorage.getItem('userId'))
      .then((value) => {
        this.user = value
      });
  }

  public dayClicked({ date }: { date: Date }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.openDialog(date);
      this.viewDate = date;
    }
  }

  public addEvent(startDate: Date, endDate: Date): void {
    this.events = [
      ...this.events,
      new Event(this.user.fullName, startDate, endDate, this.user.color),
    ];
  }

  public deleteEvent(eventToDelete: Event): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  private openDialog(date: Date): void {
    const userEvent: Event | undefined = this.events.find((event) =>
      event.isEventEqual(this.user.fullName, date)
    );

    const dialogRef = this.dialog.open(EditDayPopupComponent, {
      data: this.initialiseEditDayPopupModel(userEvent, date),
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
        let startDate: Date = DateTimeHelper.addTimeToDate(
          result.startTime,
          date
        );
        let endDate: Date = DateTimeHelper.addTimeToDate(result.endTime, date);
        this.addEvent(startDate, endDate);
      }
    });
  }

  private initialiseEditDayPopupModel(
    userEvent: Event | undefined,
    date: Date
  ): PopupModel {
    if (userEvent !== undefined) {
      this.events = this.events.filter((event) => event !== userEvent);
      return new PopupModel(
        this.user.fullName,
        DateTimeHelper.formatTime(userEvent.start),
        DateTimeHelper.formatTime(userEvent.end),
        date,
        true,
        false,
        false,
        false
      );
    } else {
      return new PopupModel(
        this.user.fullName,
        DateTimeHelper.formatTime(new Date()),
        DateTimeHelper.formatTime(new Date()),
        date,
        false,
        false,
        false,
        false
      );
    }
  }
}
