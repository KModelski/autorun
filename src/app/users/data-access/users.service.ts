import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './users.model';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private cache$!: Observable<User[]>;
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    if (!this.cache$) {
      this.cache$ = this.requestUsers().pipe(shareReplay(1));
    }

    return this.cache$;
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  updateUser(userId: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, user);
  }

  private requestUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
