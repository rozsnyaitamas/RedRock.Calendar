/* tslint:disable */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DefaultHttpOptions, HttpOptions } from './';
import { USE_DOMAIN, USE_HTTP_OPTIONS, FinanceAPIClient } from './finance-api-client.service';

import * as models from '../../models';
import * as guards from '../../guards';

/**
 * Created with https://github.com/flowup/api-client-generator
 */
@Injectable()
export class GuardedFinanceAPIClient extends FinanceAPIClient {

  constructor(readonly httpClient: HttpClient,
              @Optional() @Inject(USE_DOMAIN) domain?: string,
              @Optional() @Inject(USE_HTTP_OPTIONS) options?: DefaultHttpOptions) {
    super(httpClient, domain, options);
  }

  getMonthlyFee(
    args: {
      userReference?: string,
      startDate?: string,
      endDate?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.FinanceDTO> {
    return super.getMonthlyFee(args, requestHttpOptions)
      .pipe(tap((res: any) => guards.isFinanceDTO(res) || console.error(`TypeGuard for response 'FinanceDTO' caught inconsistency.`, res)));
  }

}
