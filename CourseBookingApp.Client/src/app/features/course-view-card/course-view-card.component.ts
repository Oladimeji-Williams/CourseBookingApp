import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../core/models/entities/course.model';

@Component({
  selector: 'app-course-view-card',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './course-view-card.component.html',
  styleUrl: './course-view-card.component.css',
})
export class CourseViewCardComponent {
  @Input() course!: Course;
  @Input() isWished: boolean = false;
  @Input() isAdmin: boolean = false;

  @Output() bookingEvent = new EventEmitter<Course>();
  @Output() wishingEvent = new EventEmitter<Course>();

  constructor(private router: Router) {}

  bookCourse(): void {
    this.bookingEvent.emit(this.course);
  }

  addToWishlist(): void {
    this.wishingEvent.emit(this.course);
  }

  goToDetails(courseId: number): void {
    this.router.navigate([`/courses/${courseId}`]);
  }

  onCardClick(event: Event) {
    const target = event.target as HTMLElement;

    // Prevent card click if user clicked a button
    if (target.closest('button')) return;

    if (this.isAdmin) {
      this.router.navigate([`/courses/update/${this.course.id}`]);
    }
  }
}
