import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFormat } from '@shared/constants';

@Component({
  selector: 'app-edit-day-popup',
  templateUrl: './edit-day-popup.component.html',
  styleUrls: ['./edit-day-popup.component.scss']
})
export class EditDayPopupComponent {
  public readonly DateFormat = DateFormat;

  constructor(public dialogRef: MatDialogRef<EditDayPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name:string, func:Function, date: Date},) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
