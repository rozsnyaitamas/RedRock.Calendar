import { CalendarView } from 'angular-calendar';
import { isSameMonth, lastDayOfMonth } from 'date-fns';

import { Component, OnInit } from '@angular/core';
import { DateFormatMonthYear } from '@shared/constants';
import { EditDayPopupComponent } from '@redrock/calendar/components/edit-day-popup/edit-day-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@redrock/models/user';
import { Event } from '@redrock/models/event';
import { PopupModel } from '@redrock/models/popupModel';
import { DateTimeHelper } from '@shared/helpers/date-time.helper';
import { UserService } from '@redrock/services/user.service';
import { EventService } from '@redrock/services/event.service';
import { EventDTO, EventPostDTO } from '@redrock/generated-html-client/models';
import { StorageConstants } from '@redrock/storage.constans';

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
  public usersInfo: { [key: string]: User } = {};

  private user!: User;

  constructor(
    public readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    let userId = sessionStorage.getItem(StorageConstants.userId);
    if (userId !== null) {
      this.userService.getById(userId).then((user) => {
        this.user = user;
        this.usersInfo[user.id] = user;
      });
    }
    this.eventService
      .getByInterval(
        DateTimeHelper.firstDayOfThisMonth(this.viewDate),
        lastDayOfMonth(this.viewDate)
      )
      .then((eventDTOs) => this.populateEventsList(eventDTOs));
  }

  private populateEventsList(eventDTOs: EventDTO[]): void {
    eventDTOs.forEach((eventDTO) => {
      let userRef: string = eventDTO.userReference;
      if (this.usersInfo[userRef] === undefined) {
        this.userService.getById(userRef).then((user) => {
          this.usersInfo[userRef] = user;
          this.addEventWithUser(eventDTO, user);
        });
      } else {
        this.addEventWithUser(eventDTO, this.usersInfo[userRef]);
      }
    });
  }

  private addEventWithUser(eventDTO: EventDTO, user: User) {
    this.events = [
      ...this.events,
      new Event(
        eventDTO.id,
        user.fullName,
        new Date(eventDTO.startDate),
        new Date(eventDTO.endDate),
        user.color
      ),
    ];
  }

  public dayClicked({ date }: { date: Date }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.openDialog(date);
      this.viewDate = date;
    }
  }

  public addEvent(startDate: Date, endDate: Date): void {
    let newEventDTO: EventPostDTO = {
      userReference: this.user.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };

    this.eventService.postNewEvent(newEventDTO).then((eventDTO) => {
      this.events = [
        ...this.events,
        new Event(
          eventDTO.id,
          this.user.fullName,
          new Date(eventDTO.startDate),
          new Date(eventDTO.endDate),
          this.user.color
        ),
      ];
    });
  }

  public deleteEvent(eventToDelete: Event): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.eventService.delete(eventToDelete.id);
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
