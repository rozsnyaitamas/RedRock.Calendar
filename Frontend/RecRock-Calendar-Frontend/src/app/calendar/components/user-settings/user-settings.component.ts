import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@redrock/models/user';
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

  public userSettingsTitle: string  = this.TITLE_USER_INFO;

  public user!: User; //TODO: change to generated UserUpdateDTO

  infoForm: FormGroup = new FormGroup({
    userFullNameFormControl: new FormControl(''),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    password: new FormControl('',[Validators.required])
  });

  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]),
    newPasswordCheck: new FormControl('',[Validators.required]),
  });

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    let userId = sessionStorage.getItem(StorageConstants.userId);
    if(userId != null){
      this.userService.getById(userId).then(user => {
        this.user = user;
        this.infoForm.controls['userFullNameFormControl'].setValue(user.fullName);
        this.infoForm.controls['primaryColor'].setValue(user.color.primary);
        this.infoForm.controls['secondaryColor'].setValue(user.color.secondary);
      })
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

  submitUpdatedUser(): void {}

  submitChangedPassword(): void {
    this.buttonClicked = true;
  }
}
