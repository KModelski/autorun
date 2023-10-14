import { take, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersService } from '../../data-access/users.service';
import { User } from '../../data-access/users.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/common/ui/modal/modal.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './users-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent implements AfterViewInit {
  columns = [
    {
      columnDef: 'id',
      header: 'Id.',
      cell: (element: User) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: User) => `${element.name}`,
    },
    {
      columnDef: 'username',
      header: 'Username',
      cell: (element: User) => `${element.username}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: User) => `${element.email}`,
    },
  ];
  clickedRows = new Set<User>();
  displayedColumns = this.columns.map((c) => c.columnDef);
  dataSource!: MatTableDataSource<User>;
  private readonly usersService = inject(UsersService);
  private readonly modalService = inject(NgbModal);
  readonly users$ = this.usersService.getUsers();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.usersService
      .getUsers()
      .pipe(
        tap((users) => {
          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }),
        take(1)
      )
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row: User) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = row;
  }
}
