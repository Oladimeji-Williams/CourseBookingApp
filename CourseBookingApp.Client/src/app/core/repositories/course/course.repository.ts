// src/app/core/repositories/course.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Course } from '../../models/entities/course.model';

@Injectable({ providedIn: 'root' })
export class CourseRepository {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  /** Get all courses */
  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  /** Get course by ID */
  getById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }

  /** Create new course */
  create(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  /** Update course */
  update(courseId: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${courseId}`, course);
  }

  /** Delete course */
  delete(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }

  /** Upload course image */
  uploadImage(courseId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('formFile', file, file.name);
    return this.http.post(`${this.apiUrl}/${courseId}/upload-image`, formData);
  }
}
