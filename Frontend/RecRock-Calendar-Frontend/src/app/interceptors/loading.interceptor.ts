import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { LoadingService } from '@shared/helpers/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loading: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loading.setLoading(true, request.url);
    console.log("intercept"); /// TODO <-delete
    return next.handle(request).pipe(catchError((err) => {
      this.loading.setLoading(false, request.url);
      return err;
    }))
    .pipe(map<unknown, any>((evt: unknown) => {
      if (evt instanceof HttpResponse) {
        this.loading.setLoading(false, request.url);
      }
      return evt;
    }));
  }
}
