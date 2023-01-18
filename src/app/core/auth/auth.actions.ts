import { Auth, User } from './auth.types';

export class SignIn {
  static readonly type = '[Auth] SignIn';
  constructor(public payload: { username: string; password: string }) {}
}

export class SignInSuccess {
  static readonly type = '[Auth] SignIn Success';
  constructor(public payload: { user: User; auth: Auth }) {}
}

export class SignInFailed {
  static readonly type = '[Auth] SignIn Failed';
  constructor(public payload: { error: string }) {}
}

export class SignOut {
  static readonly type = '[Auth] SignOut';
}
