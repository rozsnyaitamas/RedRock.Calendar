import { CalendarEvent } from "angular-calendar";
import { EventColor, EventAction } from "calendar-utils";

export class Event implements CalendarEvent{
  public id?: string | number | undefined;
  public start: Date;
  public end: Date;
  public actions?: EventAction[] | undefined;
  public allDay?: boolean | undefined;
  public cssClass?: string | undefined;
  public resizable?: { beforeStart?: boolean | undefined; afterEnd?: boolean | undefined; } | undefined;
  public draggable?: boolean | undefined;
  public meta?: any;

  constructor(public title: string, start: Date, end: Date, public color?: EventColor){
    if (start < end) {
      this.start = start;
      this.end = end;
    } else {
      this.start = end;
      this.end = start;
    }
  }

  public isEventEqual(title: string, date: Date): boolean {
    date.setHours(0,0,0,0);
    let eventDate = new Date(this.start);
    eventDate.setHours(0,0,0,0);
    return ((this.title === title) && (date.getTime() === eventDate.getTime()));
  }
}
