// src/app/core/repositories/user.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/entities/user.model';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class UserRepository {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(response => response.map(u => 
        UserMapper.fromApi(u)
      ))
    );
  }

  getById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      map(response =>
        UserMapper.fromApi(response)
      )
    );
  }

  updateUser(userId: number, model: Partial<User>): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${userId}`,
      UserMapper.toUpdateDto(model)
    );
  }

  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('formFile', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/${userId}/upload-image`, formData);
  }

  changePassword(payload: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change-password`, payload);
  }
}
