import { CommonModule, CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../core/models/entities/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent{
  @Input() course!: Course;
  @Input() isWished: boolean = false;
  @Output() bookingEvent = new EventEmitter<any>();
  @Output() wishingEvent = new EventEmitter<any>();
  constructor(private router: Router){}

  bookCourse(): void{
    this.bookingEvent.emit(this.course);
  };
  addToWishlist(): void{
    this.wishingEvent.emit(this.course);
  }
  goToDetails(courseId: number): void{
    this.router.navigate([`/courses/${courseId}`])
  }
}
