import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../../models/entities/course.model';
import { CourseRepository } from '../../repositories/course/course.repository';
@Injectable({ providedIn: 'root', })
export class CourseService
{
  constructor(private _courseRepository: CourseRepository) {} 
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