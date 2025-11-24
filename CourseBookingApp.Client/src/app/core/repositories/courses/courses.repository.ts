import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/entities/course.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesRepository {
  private readonly baseUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getAll(description?: string | null): Observable<Course[]> {
    let params: HttpParams= new HttpParams();
    if(description){
      params = params.set('description', description);
    }
    return this.http.get<Course[]>(this.baseUrl, {params});
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  update(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
