import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgbNavModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly links = [
    {
      fragment: 'users',
      title: 'Users List',
    },
    {
      fragment: 'users-table',
      title: 'Users Table',
    },
  ];
  readonly route = inject(ActivatedRoute);
}
