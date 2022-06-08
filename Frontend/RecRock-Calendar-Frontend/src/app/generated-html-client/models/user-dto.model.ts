/* tslint:disable */
import {
  UserRole,
} from '.';

export interface UserDTO {
  fullName: string;
  id: string;
  primaryColor: string;
  role: UserRole;
  secondaryColor: string;
  userName: string;
}
