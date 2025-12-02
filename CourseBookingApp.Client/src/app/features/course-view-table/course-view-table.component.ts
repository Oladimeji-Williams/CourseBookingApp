import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Course } from '../../core/models/entities/course.model';

@Component({
  selector: 'tr[app-course-view-table]',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './course-view-table.component.html',
  styleUrls: ['./course-view-table.component.css']
})
export class CourseViewTableComponent {
  @Input() course!: Course;
}
