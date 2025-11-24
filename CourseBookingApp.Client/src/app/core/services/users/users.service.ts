// src/app/core/services/users/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/entities/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  /** 🔵 Get all users */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /** Get user by id */
  getById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  /** Convenience: get currently authenticated user (from token) */
  getCurrent(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  /** Update user profile fields (PUT /users/{id}) */
  updateUser(userId: number, model: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, model);
  }

  /** Upload / replace profile picture */
  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const fd = new FormData();
    fd.append('formFile', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/${userId}/upload-image`, fd);
  }

  /** Change password through auth endpoint */
  changePassword(payload: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change-password`, payload);
  }
}
