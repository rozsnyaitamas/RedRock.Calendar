import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserUpdateDTO } from '@redrock/generated-html-client/models';
import { UserService } from '@redrock/services/user.service';
import { ValidatorHelper } from '@redrock/shared/helpers/validator.helper';
import { StorageConstants } from '@redrock/storage.constans';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  private readonly SHOW_INFO_FORM: string = 'show-infoForm';
  private readonly HIDE_INFO_FORM: string = 'hide-infoForm';
  private readonly SHOW_PASSOWD_FORM: string = 'show-passwordForm';
  private readonly HIDE_PASSWORD_FORM: string = 'hide-passwordForm';
  private readonly TITLE_USER_INFO: string = 'User info';
  private readonly TITLE_CHANGE_PASSWORD: string = 'Password';

  public buttonClicked: boolean = false;

  public infoFormClass: string = this.SHOW_INFO_FORM;
  public passwordFormClass: string = this.HIDE_PASSWORD_FORM;

  public userSettingsTitle: string = this.TITLE_USER_INFO;

  private readonly MSG_UPDATE_SUCCESS: string = 'User updated successfully';
  private readonly MSG_UPDATE_FAIL: string = 'User update ERROR';
  private readonly MSG_PASSWORD_CHANGE_SUCCESS: string =
    'Password changed successfully';
  private readonly MSG_PASSWORD_CHANGE_FAIL: string =
    "Password change ERROR!\nMake sure the 'Old Password' is correct!";

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
    this.infoFormClass = this.SHOW_INFO_FORM;
    this.passwordFormClass = this.HIDE_PASSWORD_FORM;
    this.userSettingsTitle = this.TITLE_USER_INFO;
  }

  changePassword(): void {
    this.infoFormClass = this.HIDE_INFO_FORM;
    this.passwordFormClass = this.SHOW_PASSOWD_FORM;
    this.userSettingsTitle = this.TITLE_CHANGE_PASSWORD;
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
        snackMessage = this.MSG_UPDATE_SUCCESS;
        config.panelClass = ['snack-success'];
      })
      .catch(() => {
        snackMessage = this.MSG_UPDATE_FAIL;
        config.panelClass = ['snack-fail'];
      })
      .finally(() =>
        this.snackBar.open(snackMessage, 'Close', config)
      ); //TODO: handle errors propperly
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
          snackMessage = this.MSG_PASSWORD_CHANGE_SUCCESS;
          config.panelClass = ['snack-success'];
          sessionStorage.setItem(
            StorageConstants.userPassword,
            this.passwordForm.value['newPassword']
          );
        })
        .catch(() => {
          snackMessage = this.MSG_PASSWORD_CHANGE_FAIL;
          config.panelClass = ['snack-fail'];
        })
        .finally(() => this.snackBar.open(snackMessage, 'Close', config)); //TODO: handle errors propperly
    }
  }
}
