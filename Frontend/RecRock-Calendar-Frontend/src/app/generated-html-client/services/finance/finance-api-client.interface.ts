/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';
import * as models from '../../models';

export interface FinanceAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getMonthlyFee(
    args: {
      userReference?: string,
      startDate?: string,
      endDate?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.FinanceDTO[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  createPDF(
    args: {
      id: string,
      startDate?: string,
      endDate?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<File>;

}
