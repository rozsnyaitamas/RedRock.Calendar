import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserRole } from '@redrock/generated-html-client/models';
import { UserUpdateDTO } from '@redrock/generated-html-client/models/user-update-dto.model';
import { UserService } from '@redrock/services/user.service';
import { UserRolesDropdownListType, UserRolesToDropdownHelper } from '@redrock/shared/helpers/user-roles-to-dropdown.helper';
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
  RoleFormControl,
} from '../user-settings.constants';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  public user!: UserUpdateDTO;

  public readonly userRoles: UserRolesDropdownListType[] = UserRolesToDropdownHelper.GenerateDropdownValuesFromUserRoles();
  public isNotPropertyOwner!: boolean;

  infoForm: FormGroup = new FormGroup({
    userFullNameFormControl: new FormControl(''),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    roleFormControl: new FormControl()
  });

  constructor(
    private readonly userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.userRoles);
    let userId = sessionStorage.getItem(StorageConstants.userId);
    if (userId != null) {
      this.userService.getById(userId).then((user) => {
        this.user = user;
        this.infoForm.controls[UserFullNameFormControl].setValue(user.fullName);
        this.infoForm.controls[PrimaryColor].setValue(user.color.primary);
        this.infoForm.controls[SecondaryColor].setValue(user.color.secondary);
        this.infoForm.controls[RoleFormControl].setValue(user.role);
        this.checkIfPropertyOwner(user.role);
      });
    }
  }

  private checkIfPropertyOwner(role: UserRole): void {
    this.isNotPropertyOwner = role !== UserRole.PropertyOwner;
  }

  submitUpdatedUser(): void {
    this.user.fullName = this.infoForm.value[UserFullNameFormControl];
    this.user.primaryColor = this.infoForm.value[PrimaryColor];
    this.user.secondaryColor = this.infoForm.value[SecondaryColor];
    this.user.role = this.infoForm.value[RoleFormControl];

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
