// src/app/core/services/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private userRole = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.userRole = res.user?.type ?? '';
      })
    );
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password }).pipe(
      tap((res) => {
        this.userRole = res.user?.type ?? '';
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userRole = '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  /**
   * Safe local JWT parse (no external dependency). Returns numeric id or 0 if not found.
   */
  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const claim =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

      return Number(payload[claim] ?? 0);
    } catch {
      return 0;
    }
  }

  getCurrentUserRole(): string {
    return this.userRole;
  }

  isAdmin() {
    return this.getCurrentUserRole() === 'Admin';
  }

}
