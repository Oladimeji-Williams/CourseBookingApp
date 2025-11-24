import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../../models/entities/course.model';
import { CoursesRepository } from '../../repositories/courses/courses.repository';
@Injectable({ providedIn: 'root', })
export class CoursesService
{
  constructor(private _courseRepository: CoursesRepository) {} 
  getCourses(description?: string | null): Observable<Course[]>
  {
    return this._courseRepository
      .getAll(description)
      .pipe(
        map(courses => courses.map(course =>
          (
            { ...course, isCheap: course.price < 20, }
          ))
        )
      );
  }

  // getCourses(description?: string): Observable<Course[]> {
  //   return this._courseRepository.getAll(description).pipe(
  //     map(courses =>
  //       courses.map(course => ({
  //         ...course,
  //         isCheap: course.price < 20,
  //       }))
  //     )
  //   );
  // }

    
  getCourseById(id: number): Observable<Course>
  {
    return this._courseRepository.getById(id);
  }
}