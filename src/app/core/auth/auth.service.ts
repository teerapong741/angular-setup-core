import { AuthState } from './auth.state';
import { Injectable } from '@angular/core';
import { combineLatest, delay, interval, map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { AuthUtils } from 'src/app/core/auth/auth.utils';
import { Response } from 'src/app/shared/interfaces/response.interface';
import { User, Auth } from './auth.types';
import { Select } from '@ngxs/store';
import { mockUserData } from './auth.data';

@Injectable()
export class AuthService {
  @Select(AuthState.authenticated) authenticated$!: Observable<boolean>;
  @Select(AuthState.token) token$!: Observable<string | undefined>;

  /**
   * Constructor
   */
  constructor() {}

  signIn(username: string, password: string): Observable<Response<{ user: User; auth: Auth }>> {
    return interval(2000).pipe(
      take(1),
      switchMap(() => {
        const user: User | undefined = mockUserData.find(user => user.name === username);

        if (!user) {
          return throwError(() => ({
            message: 'FAILED',
            status: 401,
            data: [],
          }));
        }

        return of({
          message: 'SUCCESS',
          status: 200,
          data: {
            user,
            auth: {
              token: 'fake token',
              refresh_token: 'fake refresh token',
            },
          },
        });
      })
    );
  }

  check() {
    return combineLatest([this.authenticated$, this.token$]).pipe(
      map(([authenticated, token]) => {
        if (authenticated) return true;

        if (!token) return false;

        if (AuthUtils.isTokenExpired(token)) return false;

        return true;
      })
    );
  }
}
