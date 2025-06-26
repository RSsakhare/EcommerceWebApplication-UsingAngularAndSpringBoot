import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BASE_API_URL } from '../../config/api';
import { getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from './user.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${BASE_API_URL}/api`;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getAuthHeaders(): HttpHeaders {
    if (this.isBrowser) {
      const token = localStorage.getItem('jwt');
      if (token) {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }
    }
    return new HttpHeaders(); // Empty headers for SSR or missing token
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('jwt') : null;
  }

  getUserProfile(): void {
    const headers = this.getAuthHeaders();

    this.http.get(`${this.apiUrl}/profile`, { headers }).pipe(
      map((user: any) => {
        console.log('Get user profile success', user);
        return getUserProfileSuccess({ userProfile: user });
      }),
      catchError((error) => {
        const message =
          error?.response?.data?.message || error?.message || 'Unknown error';
        return of(getUserProfileFailure(message));
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('jwt');
    }
    this.store.dispatch(logoutSuccess());
  }
}
