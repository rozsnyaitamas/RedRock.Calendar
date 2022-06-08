/* tslint:disable */
import {
  UserRole,
} from '.';

export interface UserUpdateDTO {
  fullName?: string;
  id: string;
  primaryColor?: string;
  role: UserRole;
  secondaryColor?: string;
}
