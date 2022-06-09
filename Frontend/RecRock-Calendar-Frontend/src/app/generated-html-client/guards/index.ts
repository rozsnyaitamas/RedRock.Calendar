/* tslint:disable */

import * as models from '../models';

/* pre-prepared guards for build in complex types */

function _isBlob(arg: any): arg is Blob {
  return arg != null && typeof arg.size === 'number' && typeof arg.type === 'string' && typeof arg.slice === 'function';
}

export function isFile(arg: any): arg is File {
return arg != null && typeof arg.lastModified === 'number' && typeof arg.name === 'string' && _isBlob(arg);
}

/* generated type guards */

export function isEventDTO(arg: any): arg is models.EventDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // endDate: string
    ( typeof arg.endDate === 'string' ) &&
    // id: string
    ( typeof arg.id === 'string' ) &&
    // startDate: string
    ( typeof arg.startDate === 'string' ) &&
    // userReference: string
    ( typeof arg.userReference === 'string' ) &&

  true
  );
  }

export function isEventPostDTO(arg: any): arg is models.EventPostDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // endDate: string
    ( typeof arg.endDate === 'string' ) &&
    // startDate: string
    ( typeof arg.startDate === 'string' ) &&
    // userReference: string
    ( typeof arg.userReference === 'string' ) &&

  true
  );
  }

export function isFinanceDTO(arg: any): arg is models.FinanceDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // month: number
    ( typeof arg.month === 'number' ) &&
    // sum: number
    ( typeof arg.sum === 'number' ) &&
    // userReference: string
    ( typeof arg.userReference === 'string' ) &&

  true
  );
  }

export function isUserChangePasswordDTO(arg: any): arg is models.UserChangePasswordDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // newPassword?: string
    ( typeof arg.newPassword === 'undefined' || typeof arg.newPassword === 'string' ) &&
    // newPasswordRepeat?: string
    ( typeof arg.newPasswordRepeat === 'undefined' || typeof arg.newPasswordRepeat === 'string' ) &&
    // password?: string
    ( typeof arg.password === 'undefined' || typeof arg.password === 'string' ) &&

  true
  );
  }

export function isUserDTO(arg: any): arg is models.UserDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // fullName: string
    ( typeof arg.fullName === 'string' ) &&
    // id: string
    ( typeof arg.id === 'string' ) &&
    // primaryColor: string
    ( typeof arg.primaryColor === 'string' ) &&
    // role: UserRole
    ( isUserRole(arg.role) ) &&
    // secondaryColor: string
    ( typeof arg.secondaryColor === 'string' ) &&
    // userName: string
    ( typeof arg.userName === 'string' ) &&

  true
  );
  }

export function isUserLoginDTO(arg: any): arg is models.UserLoginDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // password: string
    ( typeof arg.password === 'string' ) &&
    // userName: string
    ( typeof arg.userName === 'string' ) &&

  true
  );
  }

export function isUserRole(arg: any): arg is models.UserRole {
  return false
   || arg === models.UserRole.StandardUser
   || arg === models.UserRole.SupporterUser
   || arg === models.UserRole.PropertyOwner
  ;
  }

export function isUserUpdateDTO(arg: any): arg is models.UserUpdateDTO {
  return (
  arg != null &&
  typeof arg === 'object' &&
    // fullName?: string
    ( typeof arg.fullName === 'undefined' || typeof arg.fullName === 'string' ) &&
    // id: string
    ( typeof arg.id === 'string' ) &&
    // primaryColor?: string
    ( typeof arg.primaryColor === 'undefined' || typeof arg.primaryColor === 'string' ) &&
    // role: UserRole
    ( ( isUserRole(arg.role) ) ) &&
    // secondaryColor?: string
    ( typeof arg.secondaryColor === 'undefined' || typeof arg.secondaryColor === 'string' ) &&

  true
  );
  }


