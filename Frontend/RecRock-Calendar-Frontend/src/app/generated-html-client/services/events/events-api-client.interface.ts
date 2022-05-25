/* tslint:disable */

import { Observable } from 'rxjs';
import { HttpOptions } from './';
import * as models from '../../models';

export interface EventsAPIClientInterface {

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  get(
    args: {
      userReference: string,
      date?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  post(
    args: {
      newEvent: models.EventPostDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAll(
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getInterval(
    args: {
      startDate?: string,
      endDate?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO[]>;

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  delete(
    args: {
      eventId: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<File>;

}
