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


