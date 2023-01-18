import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthState } from 'src/app/core/auth/auth.state';
import { AuthUtils } from 'src/app/core/auth/auth.utils';
import { Injectable } from '@angular/core';
import { SignOut } from 'src/app/core/auth/auth.actions';
import { Store } from '@ngxs/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private store: Store) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();
    const token = this.store.selectSnapshot(AuthState.token);

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    if (token && !AuthUtils.isTokenExpired(token)) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError(error => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this.store.dispatch(new SignOut());

          // Reload the app
          location.reload();
        }

        return throwError(error);
      })
    );
  }
}
