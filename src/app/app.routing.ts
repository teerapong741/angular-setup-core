import { AuthGuard } from './core/auth/guards/auth.guard';
import { Layout } from './layout/layout.types';
import { LayoutComponent } from './layout/layout.component';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // Redirect empty path to '/dashboards/project'
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: Layout.EMPTY,
    },
    children: [
      { path: 'sign-in', loadChildren: () => import('src/app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },

  // Auth routes for authenticated users

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: Layout.ADMIN,
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },

  // User routes

  // Global routes
  {
    path: '404-not-found',
    pathMatch: 'full',
    loadChildren: () => import('src/app/modules/global/error-404/error-404.module').then(m => m.Error404Module),
  },
  { path: '**', redirectTo: '404-not-found' },
];
