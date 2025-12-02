// src/app/core/services/course.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseRepository } from '../../repositories/course/course.repository';
import { Course } from '../../models/entities/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private courseRepo: CourseRepository) {}

  getAllCourses(): Observable<Course[]> {
    return this.courseRepo.getAll();
  }

  getCourseById(id: number): Observable<Course> {
    return this.courseRepo.getById(id);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.courseRepo.create(course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.courseRepo.update(id, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.courseRepo.delete(id);
  }

  uploadCourseImage(id: number, file: File): Observable<any> {
    return this.courseRepo.uploadImage(id, file);
  }
}
