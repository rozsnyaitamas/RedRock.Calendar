import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageConstants } from '@redrock/storage.constans';
import { environment } from 'environments/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userName = sessionStorage.getItem(StorageConstants.userName);
    const userPassword = sessionStorage.getItem(StorageConstants.userPassword);
    const isApiUrl = request.url.startsWith(environment.serverUrl);

    if (userName && userPassword && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${window.btoa(userName + ':' + userPassword)}`,
        },
      });
    }
    return next.handle(request);
  }
}
