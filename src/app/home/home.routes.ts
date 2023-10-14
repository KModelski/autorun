import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.routes').then((r) => r.USERS_ROUTES),
      },
      {
        path: 'users-table',
        loadComponent: () =>
          import('../users/feature/users-table/users-table.component').then(
            (c) => c.UsersTableComponent
          ),
      },
      {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full',
      },
    ],
  },
];
