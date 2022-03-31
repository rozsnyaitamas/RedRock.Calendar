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

  constructor(public title: string, _start: Date, _end: Date, public color?: EventColor){
    if (_start < _end) {
      this.start = _start;
      this.end = _end;
    } else {
      this.start = _end;
      this.end = _start;
    }
  }

  public isThisEvent(title: string, date: Date): boolean {
    date.setHours(0,0,0,0);
    let eventDate = new Date(this.start);
    eventDate.setHours(0,0,0,0);
    return ((this.title === title) && (date.getTime() === eventDate.getTime()));
  }
}
