import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-app',
  templateUrl: './calendar-app.component.html',
  styleUrls: ['./calendar-app.component.scss']
})
export class CalendarAppComponent implements OnInit {

  public viewDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  updateViewDate(viewDate: Date) {
    this.viewDate = viewDate;
  }

}
