import { Observable } from 'rxjs/internal/Observable';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../data-access/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../data-access/users.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  user$ = new Observable<User>();

  ngOnInit(): void {
    this.user$ = this.getUserDetails();
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  private getUserDetails(): Observable<User> {
    const userId = this.activatedRoute.snapshot.params['id'];
    return this.usersService.getUser(userId);
  }
}
