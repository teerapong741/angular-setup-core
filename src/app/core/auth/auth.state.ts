import { AuthService } from './auth.service';
import { AuthStateModel } from './auth.types';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SignIn, SignInSuccess, SignInFailed, SignOut } from './auth.actions';
import { tap, switchMap, iif, mergeMap, catchError, throwError, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loading: false,
    error: null,
    auth: null,
    user: null,
    authenticated: false,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private store: Store, private router: Router, private route: ActivatedRoute) {}

  /*
   * Selector
   */
  @Selector([AuthState])
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector([AuthState])
  static authenticated(state: AuthStateModel) {
    return state.authenticated;
  }

  @Selector([AuthState])
  static token(state: AuthStateModel) {
    return state.auth?.token;
  }

  @Selector([AuthState])
  static role(state: AuthStateModel) {
    return state.user?.role;
  }

  /*
   * Action
   */
  @Action(SignIn)
  signIn(ctx: StateContext<AuthStateModel>, { payload }: SignIn) {
    const { password, username } = payload;
    this.authService
      .signIn(username, password)
      .pipe(
        take(1),
        mergeMap(res => {
          return ctx.dispatch(new SignInSuccess(res.data));
        }),
        catchError(err => {
          const { message } = err;
          return ctx.dispatch(new SignInFailed(message));
        })
      )
      .subscribe();
  }

  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<AuthStateModel>, { payload }: SignInSuccess) {
    const { auth, user } = payload;
    const redirectURL = this.route.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

    // Navigate to the redirect url
    this.router.navigateByUrl(redirectURL);

    return ctx.patchState({
      auth,
      user,
      authenticated: true,
    });
  }

  @Action(SignInFailed)
  signInFailed(ctx: StateContext<AuthStateModel>, { payload }: SignInFailed) {
    const { error } = payload;
    return ctx.patchState({
      auth: null,
      user: null,
      authenticated: false,
      error,
    });
  }

  @Action(SignOut)
  signOut(ctx: StateContext<AuthStateModel>) {
    return ctx.patchState({
      auth: null,
      user: null,
      authenticated: false,
      error: null,
    });
  }
}
