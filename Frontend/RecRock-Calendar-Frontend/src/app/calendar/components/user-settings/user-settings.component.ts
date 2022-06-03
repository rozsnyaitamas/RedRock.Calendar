import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserUpdateDTO } from '@redrock/generated-html-client/models';
import { UserService } from '@redrock/services/user.service';
import { ValidatorHelper } from '@redrock/shared/helpers/validator.helper';
import { StorageConstants } from '@redrock/storage.constans';
import {
  ShowInfoForm,
  HidePasswordForm,
  TitleUserInfo,
  HideInfoForm,
  ShowPasswordForm,
  TitleChangePassword,
  MsgUpdateSuccess,
  MsgUpdateFail,
  MsgPasswordChangeSuccess,
  MsgPasswordChangeFail,
} from '@redrock/calendar/components/user-settings/user-settings.constants';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  public buttonClicked: boolean = false;

  public infoFormClass: string = ShowInfoForm;
  public passwordFormClass: string = HidePasswordForm;

  public userSettingsTitle: string = TitleUserInfo;

  public user!: UserUpdateDTO; //TODO: change to generated UserUpdateDTO

  infoForm: FormGroup = new FormGroup({
    userFullNameFormControl: new FormControl(''),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
  });

  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordCheck: new FormControl('', [Validators.required]),
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
        this.infoForm.controls['userFullNameFormControl'].setValue(
          user.fullName
        );
        this.infoForm.controls['primaryColor'].setValue(user.color.primary);
        this.infoForm.controls['secondaryColor'].setValue(user.color.secondary);
      });
    }
    this.passwordForm.controls['newPasswordCheck'].addValidators(
      ValidatorHelper.isTheSame(this.passwordForm.controls['newPassword'])
    );
  }

  editUserForm(): void {
    this.infoFormClass = ShowInfoForm;
    this.passwordFormClass = HidePasswordForm;
    this.userSettingsTitle = TitleUserInfo;
  }

  changePassword(): void {
    this.infoFormClass = HideInfoForm;
    this.passwordFormClass = ShowPasswordForm;
    this.userSettingsTitle = TitleChangePassword;
  }

  submitUpdatedUser(): void {
    this.user.fullName = this.infoForm.value['userFullNameFormControl'];
    this.user.primaryColor = this.infoForm.value['primaryColor'];
    this.user.secondaryColor = this.infoForm.value['secondaryColor'];

    let snackMessage = '';
    let config = new MatSnackBarConfig();
    config.duration = 2000;

    this.userService
      .updateUser(this.user.id, this.user)
      .then(() => {
        snackMessage = MsgUpdateSuccess;
        config.panelClass = ['snack-success'];
      })
      .catch(() => {
        snackMessage = MsgUpdateFail;
        config.panelClass = ['snack-fail'];
      })
      .finally(() => this.snackBar.open(snackMessage, 'Close', config)); //TODO: handle errors propperly
  }

  submitChangedPassword(): void {
    this.buttonClicked = true;

    let snackMessage = '';
    let config = new MatSnackBarConfig();

    if (this.passwordForm.valid) {
      this.userService
        .changePassword(this.user.id, {
          password: this.passwordForm.value['oldPassword'],
          newPassword: this.passwordForm.value['newPassword'],
          newPasswordRepeat: this.passwordForm.value['newPasswordCheck'],
        })
        .then(() => {
          snackMessage = MsgPasswordChangeSuccess;
          config.panelClass = ['snack-success'];
          sessionStorage.setItem(
            StorageConstants.userPassword,
            this.passwordForm.value['newPassword']
          );
        })
        .catch(() => {
          snackMessage = MsgPasswordChangeFail;
          config.panelClass = ['snack-fail'];
        })
        .finally(() => this.snackBar.open(snackMessage, 'Close', config)); //TODO: handle errors propperly
    }
  }
}
