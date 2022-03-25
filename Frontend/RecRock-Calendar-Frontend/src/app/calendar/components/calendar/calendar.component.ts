import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { endOfDay, isSameMonth, startOfDay} from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { EditDayPopupComponent } from '../edit-day-popup/edit-day-popup.component';
import { User } from 'src/app/models/user';
import { Colors } from 'src/app/shared/colors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


  CalendarView = CalendarView;

  user: User = new User();

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
  ];

  constructor(private modal: NgbModal, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.user.id = 0;
    this.user.name = "Tamas";
    this.user.color = Colors.blue;
  }
  openDialog(_date: Date) {
    const dialogRef = this.dialog.open(EditDayPopupComponent, {
      data: {name: this.user.name, func: this.addEvent, date: _date}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.name}`);
    });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
        this.openDialog(date);
      this.viewDate = date;
    }
  }


  addEvent = (date: Date) => {
    this.events = [
      ...this.events,
      {
        title: this.user.name,
        start: startOfDay(date),
        end: endOfDay(date),
        color: this.user.color,
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

}
