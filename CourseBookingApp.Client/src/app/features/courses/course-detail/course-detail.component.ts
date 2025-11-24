import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../core/services/courses/courses.service';
import { Course } from '../../../core/models/entities/course.model';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit {

  course: Course | null = null;

  private route = inject(ActivatedRoute);
  private coursesService = inject(CoursesService);
  private destroyRef = inject(DestroyRef);   // ✅ REQUIRED

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),  // ✅ PASS destroyRef
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.coursesService.getCourseById(id);
        })
      )
      .subscribe({
        next: course => this.course = course,
        error: err => console.error('Failed to load course:', err)
      });
  }
}
