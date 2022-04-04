import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateFormatDayMonthYear,
  TimePickerDarkTheme,
  TimeFormat,
} from '@shared/constants';
import { PopupModel } from '@redrock/models/popupModel';
import { DateTimeHelper } from '@redrock/shared/helpers/date-time.helper';

@Component({
  selector: 'app-edit-day-popup',
  templateUrl: './edit-day-popup.component.html',
  styleUrls: ['./edit-day-popup.component.scss'],
})
export class EditDayPopupComponent {
  public readonly DateFormat = DateFormatDayMonthYear;
  public readonly TimeWarning: string =
    "'Start' time should come before the 'End' time...";
  public readonly DarkTheme = TimePickerDarkTheme;
  public readonly TimeFormat = TimeFormat;

  private readonly WarningClass = 'warning';
  private readonly NoWarningClass = 'no-warning';

  public warningIconClass = this.NoWarningClass;

  constructor(
    public dialogRef: MatDialogRef<EditDayPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PopupModel
  ) {}

  onCancelClick(): void {
    this.data.noModification = true;
  }

  onReserveClick(): void {
    this.data.saveEvent = true;
  }

  setDeleteFlag(): void {
    this.data.deleteEvent = true;
  }

  timeChanged(): void {
    this.warningIconClass =
      DateTimeHelper.isTimeSwitched(this.data.startTime, this.data.endTime)
        ? this.WarningClass
        : this.NoWarningClass;
  }
}
