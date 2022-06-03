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
  CssClassSnackSuccess,
  CssClassSnackFail,
  SnackActionClose,
  UserFullNameFormControl,
  PrimaryColor,
  SecondaryColor,
  NewPassword,
  NewPasswordCheck,
  OldPassword
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

  // public user!: UserUpdateDTO;

  // infoForm: FormGroup = new FormGroup({
  //   userFullNameFormControl: new FormControl(''),
  //   primaryColor: new FormControl(),
  //   secondaryColor: new FormControl(),
  // });

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
    // let userId = sessionStorage.getItem(StorageConstants.userId);
    // if (userId != null) {
    //   this.userService.getById(userId).then((user) => {
    //     this.user = user;
    //     this.infoForm.controls[UserFullNameFormControl].setValue(
    //       user.fullName
    //     );
    //     this.infoForm.controls[PrimaryColor].setValue(user.color.primary);
    //     this.infoForm.controls[SecondaryColor].setValue(user.color.secondary);
    //   });
    // }
    this.passwordForm.controls[NewPasswordCheck].addValidators(
      ValidatorHelper.isTheSame(this.passwordForm.controls[NewPassword])
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

  // submitUpdatedUser(): void {
  //   this.user.fullName = this.infoForm.value[UserFullNameFormControl];
  //   this.user.primaryColor = this.infoForm.value[PrimaryColor];
  //   this.user.secondaryColor = this.infoForm.value[SecondaryColor];

  //   let snackMessage = '';
  //   let config = new MatSnackBarConfig();
  //   config.duration = 2000;

  //   this.userService
  //     .updateUser(this.user.id, this.user)
  //     .then(() => {
  //       snackMessage = MsgUpdateSuccess;
  //       config.panelClass = [CssClassSnackSuccess];
  //     })
  //     .catch(() => {
  //       snackMessage = MsgUpdateFail;
  //       config.panelClass = [CssClassSnackFail];
  //     })
  //     .finally(() => this.snackBar.open(snackMessage, SnackActionClose, config)); //TODO: handle errors propperly
  // }

  submitChangedPassword(): void {
    this.buttonClicked = true;

    let snackMessage = '';
    let config = new MatSnackBarConfig();

    let userId = sessionStorage.getItem(StorageConstants.userId);

    if (this.passwordForm.valid && userId) {
      this.userService
        .changePassword(userId, {
          password: this.passwordForm.value[OldPassword],
          newPassword: this.passwordForm.value[NewPassword],
          newPasswordRepeat: this.passwordForm.value[NewPasswordCheck],
        })
        .then(() => {
          snackMessage = MsgPasswordChangeSuccess;
          config.panelClass = [CssClassSnackSuccess];
          sessionStorage.setItem(
            StorageConstants.userPassword,
            this.passwordForm.value[NewPassword]
          );
        })
        .catch(() => {
          snackMessage = MsgPasswordChangeFail;
          config.panelClass = [CssClassSnackFail];
        })
        .finally(() => this.snackBar.open(snackMessage, SnackActionClose, config)); //TODO: handle errors propperly
    }
  }
}
