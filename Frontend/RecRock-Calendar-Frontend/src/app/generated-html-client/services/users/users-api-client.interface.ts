/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';
import * as models from '../../models';

export interface UsersAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  get(
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getById(
    args: {
      id: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  update(
    args: {
      id: string,
      userDTO: models.UserUpdateDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  changePassword(
    args: {
      id: string,
      passwords: models.UserChangePasswordDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  login(
    args: {
      userParam: models.UserLoginDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO>;

}
