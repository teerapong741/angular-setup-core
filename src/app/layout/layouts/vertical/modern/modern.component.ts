import { AuthService } from 'src/app/core/auth/auth.service';
import { GetNavigation } from 'src/app/core/navigations/navigation.actions';
import { NavigationState } from 'src/app/core/navigations/navigation.state';
import { NavigationItem } from 'src/app/core/navigations/navigation.types';
import { Observable, tap, takeUntil, Subject, distinctUntilChanged } from 'rxjs';
import { AuthState } from 'src/app/core/auth/auth.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Role, User } from 'src/app/core/auth/auth.types';

@Component({
  selector: 'app-modern',
  templateUrl: './modern.component.html',
  styleUrls: ['./modern.component.scss'],
})
export class ModernComponent implements OnInit, OnDestroy {
  @Select(AuthState.user) user$!: Observable<User>;
  @Select(NavigationState.navigationItems) navigationItems$!: Observable<NavigationItem[]>;
  @Select(NavigationState.loading) loading$!: Observable<boolean>;
  @Select(NavigationState.error) error$!: Observable<string | null>;

  observable$: Subject<void> = new Subject<void>();

  reloadNavigationItems$: Subject<void> = new Subject<void>();
  reloadNavigationItems$$ = this.reloadNavigationItems$
    .pipe(
      takeUntil(this.observable$),
      tap(() => {
        this.store.dispatch(new GetNavigation());
      })
    )
    .subscribe();

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .check()
      .pipe(
        takeUntil(this.observable$),
        distinctUntilChanged(),
        tap(isLoggedIn => {
          if (isLoggedIn) this.store.dispatch(new GetNavigation());
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.observable$.next();
    this.observable$.complete();
  }

  toggleNavigation(): void {}
}
