import { Component, OnInit } from '@angular/core';
import {
  ShowInfoForm,
  HidePasswordForm,
  TitleUserInfo,
  HideInfoForm,
  ShowPasswordForm,
  TitleChangePassword,
} from '@redrock/calendar/components/user-settings/user-settings.constants';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  public infoFormClass: string = ShowInfoForm;
  public passwordFormClass: string = HidePasswordForm;

  public userSettingsTitle: string = TitleUserInfo;

  constructor() {}

  ngOnInit(): void {}

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
}
