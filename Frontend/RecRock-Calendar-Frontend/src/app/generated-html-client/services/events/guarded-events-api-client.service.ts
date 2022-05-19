/* tslint:disable */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DefaultHttpOptions, HttpOptions } from './';
import { USE_DOMAIN, USE_HTTP_OPTIONS, EventsAPIClient } from './events-api-client.service';

import * as models from '../../models';
import * as guards from '../../guards';

/**
 * Created with https://github.com/flowup/api-client-generator
 */
@Injectable()
export class GuardedEventsAPIClient extends EventsAPIClient {

  constructor(readonly httpClient: HttpClient,
              @Optional() @Inject(USE_DOMAIN) domain?: string,
              @Optional() @Inject(USE_HTTP_OPTIONS) options?: DefaultHttpOptions) {
    super(httpClient, domain, options);
  }

  get(
    args: {
      userReference: string,
      date?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO> {
    return super.get(args, requestHttpOptions)
      .pipe(tap((res: any) => guards.isEventDTO(res) || console.error(`TypeGuard for response 'EventDTO' caught inconsistency.`, res)));
  }

  post(
    args: {
      newEvent: models.EventDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO> {
    return super.post(args, requestHttpOptions)
      .pipe(tap((res: any) => guards.isEventDTO(res) || console.error(`TypeGuard for response 'EventDTO' caught inconsistency.`, res)));
  }

  getAll(
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO[]> {
    return super.getAll(requestHttpOptions)
      .pipe(tap((res: any) => guards.isEventDTO(res) || console.error(`TypeGuard for response 'EventDTO' caught inconsistency.`, res)));
  }

}
