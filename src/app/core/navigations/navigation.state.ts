import { Action, Select, Selector, State, StateContext, Store } from '@ngxs/store';
import { GetNavigation, GetNavigationFailed, GetNavigationSuccess } from './navigation.actions';
import { Observable, switchMap, tap, take, catchError, mergeMap } from 'rxjs';

import { AuthState } from '../auth/auth.state';
import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { NavigationStateModel } from './navigation.types';
import { Role } from '../auth/auth.types';

@State<NavigationStateModel>({
  name: 'navigation',
  defaults: {
    error: null,
    loading: false,
    navigation: [],
  },
})
@Injectable()
export class NavigationState {
  @Select(AuthState.role) role$!: Observable<Role>;
  @Select(AuthState.authenticated) authenticated$!: Observable<boolean>;

  constructor(private navigationService: NavigationService, private store: Store) {}

  /*
   * Selector
   */
  @Selector([NavigationState])
  static navigationItems(state: NavigationStateModel) {
    return state.navigation;
  }

  @Selector([NavigationState])
  static loading(state: NavigationStateModel) {
    return state.loading;
  }

  @Selector([NavigationState])
  static error(state: NavigationStateModel) {
    return state.error;
  }

  /*
   * Action
   */
  @Action(GetNavigation)
  getNavigation(ctx: StateContext<NavigationStateModel>) {
    this.role$
      .pipe(
        take(1),
        tap(() => {
          ctx.patchState({
            loading: true,
            error: null,
            navigation: [],
          });
        }),
        switchMap(role =>
          this.navigationService.getNavigation(role).pipe(
            mergeMap(res => {
              ctx.patchState({
                navigation: res.data,
                error: null,
                loading: false,
              });
              return this.store.dispatch(new GetNavigationSuccess());
            }),
            catchError(res => {
              ctx.patchState({
                navigation: res.data,
                error: res.message,
                loading: false,
              });
              return this.store.dispatch(new GetNavigationFailed());
            })
          )
        )
      )
      .subscribe();
  }

  @Action(GetNavigationSuccess)
  getNavigationSuccess(ctx: StateContext<NavigationStateModel>) {
    return ctx.getState();
  }

  @Action(GetNavigationFailed)
  getNavigationFailed(ctx: StateContext<NavigationStateModel>) {
    return ctx.getState();
  }
}
