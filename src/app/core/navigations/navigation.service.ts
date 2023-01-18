import { Role } from './../auth/auth.types';
import { Observable, delay, map, throwError, of, take, switchMap, interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/shared/interfaces/response.interface';
import { NavigationItem } from './navigation.types';
import { mockNavigationAdmin, mockNavigationDCC, mockNavigationManagement } from './navigation.data';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  getNavigation(role: Role, isError: boolean = false): Observable<Response<NavigationItem[]>> {
    return interval(2000).pipe(
      take(1),
      switchMap(() => {
        const response: Response<NavigationItem[]> = {
          message: 'SUCCESS',
          status: 200,
          data: [],
        };

        switch (role) {
          case 'ADMIN':
            response.data = mockNavigationAdmin;
            break;
          case 'DCC':
            response.data = mockNavigationDCC;
            break;
          case 'MANAGEMENT':
            response.data = mockNavigationManagement;
            break;
          default:
            break;
        }

        if (isError) {
          return throwError(() => ({
            message: 'FAILED',
            status: 401,
            data: [],
          }));
        }

        return of(response);
      })
    );
  }
}
