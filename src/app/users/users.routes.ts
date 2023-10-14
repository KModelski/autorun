import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/users-list/users-list.component').then(
        (c) => c.UsersListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./feature/user-details/user-details.component').then(
        (c) => c.UserDetailsComponent
      ),
  },
];
