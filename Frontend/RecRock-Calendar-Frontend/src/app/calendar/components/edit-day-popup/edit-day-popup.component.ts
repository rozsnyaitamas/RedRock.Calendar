import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-day-popup',
  templateUrl: './edit-day-popup.component.html',
  styleUrls: ['./edit-day-popup.component.scss']
})
export class EditDayPopupComponent implements OnInit {

  // addEvent: Function;

  constructor(public dialogRef: MatDialogRef<EditDayPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name:string, func:Function, date: Date},) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
