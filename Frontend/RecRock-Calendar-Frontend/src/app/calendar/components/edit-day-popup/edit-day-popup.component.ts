import { Time } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFormat_day_month_year, Time_picker_dark_theme } from '@shared/constants';

@Component({
  selector: 'app-edit-day-popup',
  templateUrl: './edit-day-popup.component.html',
  styleUrls: ['./edit-day-popup.component.scss'],
})
export class EditDayPopupComponent {
  public readonly DateFormat = DateFormat_day_month_year;
  public readonly timeWarning: string = "'Start' time should come before the 'End' time...";
  public readonly darkTheme = Time_picker_dark_theme;

  private readonly warningClass = "warning";
  private readonly noWarningClass = "no-warning";

  public warningIconClass = this.noWarningClass;

  constructor(
    public dialogRef: MatDialogRef<EditDayPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      startTime: Time;
      endTime: Time;
      date: Date;
      eventExists: boolean;
      deleteEvent: boolean;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setDeleteFlag(): void {
    this.data.deleteEvent = true;
  }

  isTimeSwitched(): boolean {
    return this.data.startTime>this.data.endTime;
  }

  changed():void{
    this.warningIconClass = this.data.startTime>this.data.endTime ? this.warningClass : this.noWarningClass;
  }

}
