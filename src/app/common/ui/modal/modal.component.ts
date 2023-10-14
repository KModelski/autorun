import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/users/data-access/users.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from 'src/app/users/data-access/users.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() user!: User;
  readonly activeModal = inject(NgbActiveModal);
  nameFormControl = new FormControl(
    { value: '', disabled: true },
    { nonNullable: true }
  );
  usernameFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  emailFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  userForm = new FormGroup({
    name: this.nameFormControl,
    username: this.usernameFormControl,
    email: this.emailFormControl,
  });
  private readonly usersService = inject(UsersService);

  ngOnInit(): void {
    this.userForm.patchValue(this.user);
  }

  onSubmit(): void {
    const user = this.userForm.value;
    this.usersService
      .updateUser(this.user.id.toString(), user)
      .pipe(
        tap(() => this.activeModal.close()),
        take(1)
      )
      .subscribe();
    this.activeModal.close();
  }

  reset() {
    this.userForm.reset();
    this.userForm.patchValue(this.user);
  }
}
