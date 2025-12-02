import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../core/models/entities/course.model';
import { CourseViewCardComponent } from "../course-view-card/course-view-card.component";

@Component({
  selector: 'app-course-view-card-list',
  standalone: true,
  imports: [CommonModule, CourseViewCardComponent],
  templateUrl: './course-view-card-list.component.html',
  styleUrl: './course-view-card-list.component.css',
})
export class CourseViewCardListComponent {
  @Input() courses: Course[] = [];
  @Input() wishlist: Course[] = [];
  @Input() isAdmin: boolean = false;

  @Output() bookingEvent = new EventEmitter<Course>();
  @Output() wishingEvent = new EventEmitter<Course>();

  isInWishlist(course: Course): boolean {
    return this.wishlist.some(c => c.id === course.id);
  }
}
