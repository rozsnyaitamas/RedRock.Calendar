/* tslint:disable */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DefaultHttpOptions, HttpOptions, EventsAPIClientInterface } from './';

import * as models from '../../models';

export const USE_DOMAIN = new InjectionToken<string>('EventsAPIClient_USE_DOMAIN');
export const USE_HTTP_OPTIONS = new InjectionToken<HttpOptions>('EventsAPIClient_USE_HTTP_OPTIONS');

type APIHttpOptions = HttpOptions & {
  headers: HttpHeaders;
  params: HttpParams;
  responseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
};

/**
 * Created with https://github.com/flowup/api-client-generator
 */
@Injectable()
export class EventsAPIClient implements EventsAPIClientInterface {

  readonly options: APIHttpOptions;

  readonly domain: string = `http://localhost:5000`;

  constructor(private readonly http: HttpClient,
              @Optional() @Inject(USE_DOMAIN) domain?: string,
              @Optional() @Inject(USE_HTTP_OPTIONS) options?: DefaultHttpOptions) {

    if (domain != null) {
      this.domain = domain;
    }

    this.options = {
      headers: new HttpHeaders(options && options.headers ? options.headers : {}),
      params: new HttpParams(options && options.params ? options.params : {}),
      ...(options && options.reportProgress ? { reportProgress: options.reportProgress } : {}),
      ...(options && options.withCredentials ? { withCredentials: options.withCredentials } : {})
    };
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  get(
    args: {
      userReference: string,
      date?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO> {
    const path = `/api/Events/${args.userReference}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    if ('date' in args) {
      options.params = options.params.set('date', String(args.date));
    }
    return this.sendRequest<models.EventDTO>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  post(
    args: {
      newEvent: models.EventPostDTO,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO> {
    const path = `/api/Events`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<models.EventDTO>('POST', path, options, JSON.stringify(args.newEvent));
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getAll(
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO[]> {
    const path = `/api/Events`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    return this.sendRequest<models.EventDTO[]>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  getInterval(
    args: {
      startDate?: string,
      endDate?: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<models.EventDTO[]> {
    const path = `/api/Events/interval`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
    };

    if ('startDate' in args) {
      options.params = options.params.set('startDate', String(args.startDate));
    }
    if ('endDate' in args) {
      options.params = options.params.set('endDate', String(args.endDate));
    }
    return this.sendRequest<models.EventDTO[]>('GET', path, options);
  }

  /**
   * Response generated for [ 200 ] HTTP response code.
   */
  delete(
    args: {
      eventId: string,
    },
    requestHttpOptions?: HttpOptions
  ): Observable<File> {
    const path = `/api/Events/${args.eventId}`;
    const options: APIHttpOptions = {
      ...this.options,
      ...requestHttpOptions,
      responseType: 'blob',
    };
    return this.sendRequest<File>('DELETE', path, options);
  }

  private sendRequest<T>(method: string, path: string, options: HttpOptions, body?: any): Observable<T> {
    switch (method) {
      case 'DELETE':
        return this.http.delete<T>(`${this.domain}${path}`, options);
      case 'GET':
        return this.http.get<T>(`${this.domain}${path}`, options);
      case 'HEAD':
        return this.http.head<T>(`${this.domain}${path}`, options);
      case 'OPTIONS':
        return this.http.options<T>(`${this.domain}${path}`, options);
      case 'PATCH':
        return this.http.patch<T>(`${this.domain}${path}`, body, options);
      case 'POST':
        return this.http.post<T>(`${this.domain}${path}`, body, options);
      case 'PUT':
        return this.http.put<T>(`${this.domain}${path}`, body, options);
      default:
        console.error(`Unsupported request: ${method}`);
        return throwError(`Unsupported request: ${method}`);
    }
  }
}
