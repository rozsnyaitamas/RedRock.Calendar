import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserUpdateDTO } from '@redrock/generated-html-client/models/user-update-dto.model';
import { UserService } from '@redrock/services/user.service';
import { StorageConstants } from '@redrock/storage.constans';
import {
  UserFullNameFormControl,
  PrimaryColor,
  SecondaryColor,
  MsgUpdateSuccess,
  CssClassSnackSuccess,
  MsgUpdateFail,
  CssClassSnackFail,
  SnackActionClose,
} from '../user-settings.constants';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  public user!: UserUpdateDTO;

  infoForm: FormGroup = new FormGroup({
    userFullNameFormControl: new FormControl(''),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
  });

  constructor(
    private readonly userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let userId = sessionStorage.getItem(StorageConstants.userId);
    if (userId != null) {
      this.userService.getById(userId).then((user) => {
        this.user = user;
        this.infoForm.controls[UserFullNameFormControl].setValue(user.fullName);
        this.infoForm.controls[PrimaryColor].setValue(user.color.primary);
        this.infoForm.controls[SecondaryColor].setValue(user.color.secondary);
      });
    }
  }

  submitUpdatedUser(): void {
    this.user.fullName = this.infoForm.value[UserFullNameFormControl];
    this.user.primaryColor = this.infoForm.value[PrimaryColor];
    this.user.secondaryColor = this.infoForm.value[SecondaryColor];

    let snackMessage = '';
    let config = new MatSnackBarConfig();
    config.duration = 2000;

    this.userService
      .updateUser(this.user.id, this.user)
      .then(() => {
        snackMessage = MsgUpdateSuccess;
        config.panelClass = [CssClassSnackSuccess];
      })
      .catch(() => {
        snackMessage = MsgUpdateFail;
        config.panelClass = [CssClassSnackFail];
      })
      .finally(() =>
        this.snackBar.open(snackMessage, SnackActionClose, config)
      ); //TODO: handle errors propperly
  }
}
