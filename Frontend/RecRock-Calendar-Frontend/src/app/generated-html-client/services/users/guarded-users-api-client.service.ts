/* tslint:disable */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DefaultHttpOptions, HttpOptions } from './';
import { USE_DOMAIN, USE_HTTP_OPTIONS, UsersAPIClient } from './users-api-client.service';

import * as models from '../../models';
import * as guards from '../../guards';

/**
 * Created with https://github.com/flowup/api-client-generator
 */
@Injectable()
export class GuardedUsersAPIClient extends UsersAPIClient {

  constructor(readonly httpClient: HttpClient,
              @Optional() @Inject(USE_DOMAIN) domain?: string,
              @Optional() @Inject(USE_HTTP_OPTIONS) options?: DefaultHttpOptions) {
    super(httpClient, domain, options);
  }

  override get(
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO[]> {
    return super.get(requestHttpOptions)
      .pipe(tap((res: any) => guards.isUserDTO(res) || console.error(`TypeGuard for response 'UserDTO' caught inconsistency.`, res)));
  }

  override getById(
    args: {
      id: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO> {
    return super.getById(args, requestHttpOptions)
      .pipe(tap((res: any) => guards.isUserDTO(res) || console.error(`TypeGuard for response 'UserDTO' caught inconsistency.`, res)));
  }

  override login(
    args: {
      userParam: models.UserLoginDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.UserDTO> {
    return super.login(args, requestHttpOptions)
      .pipe(tap((res: any) => guards.isUserDTO(res) || console.error(`TypeGuard for response 'UserDTO' caught inconsistency.`, res)));
  }

}
