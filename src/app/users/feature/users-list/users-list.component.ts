import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../data-access/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  users$ = this.usersService.getUsers();

  goToDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
