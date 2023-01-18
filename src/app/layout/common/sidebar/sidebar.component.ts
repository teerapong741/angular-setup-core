import { Subject, takeUntil, tap } from 'rxjs';
import { NavigationItem } from 'src/app/core/navigations/navigation.types';
import { User } from 'src/app/core/auth/auth.types';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy {
  @Input() user: User | null = null;
  @Input() navigationItems: NavigationItem[] = [];
  @Input() error: string | null = null;
  @Input() loading: boolean = false;

  @Output() reloadNavigationItems: EventEmitter<void> = new EventEmitter<void>();

  observable$: Subject<void> = new Subject<void>();
  reloadNavigationItems$: Subject<void> = new Subject<void>();
  reloadNavigationItems$$ = this.reloadNavigationItems$
    .pipe(
      takeUntil(this.observable$),
      tap(() => {
        this.reloadNavigationItems.emit();
      })
    )
    .subscribe();
  goToMainWeb$: Subject<void> = new Subject<void>();
  goToMainWeb$$ = this.goToMainWeb$
    .pipe(
      takeUntil(this.observable$),
      tap(() => {
        window.open('https://www.salana.co.th/');
      })
    )
    .subscribe();

  constructor() {}

  trackByIdentity = (index: number, item: NavigationItem) => item.id;

  ngOnDestroy(): void {
    this.observable$.next();
    this.observable$.complete();
  }
}
