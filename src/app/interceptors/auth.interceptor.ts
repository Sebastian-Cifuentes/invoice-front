import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(request)
        .pipe(catchError(this.handleError));
    }
    const headers = request.clone({
      headers: request.headers.set('x-token', `${token}`)
    });


    return next.handle(headers)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles error
   * @param error type `HttpErrorResponse`
   * @returns throwError
   */
  handleError(error: HttpErrorResponse) {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.log(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error.message}`);
    console.log(error);

    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}
