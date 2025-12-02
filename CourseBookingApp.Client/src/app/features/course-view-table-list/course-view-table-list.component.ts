import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../core/models/entities/course.model';
import { CourseViewTableComponent } from '../course-view-table/course-view-table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-view-table-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseViewTableComponent],
  templateUrl: './course-view-table-list.component.html',
  styleUrls: ['./course-view-table-list.component.css']
})
export class CourseViewTableListComponent implements OnChanges {

  @Input() courses: Course[] = [];

  search = '';
  filteredCourses: Course[] = [];

  constructor(private router: Router) {}

  ngOnChanges() {
    this.filteredCourses = this.courses;
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filteredCourses = this.courses.filter(c =>
      c.title.toLowerCase().includes(s) ||
      c.description?.toLowerCase().includes(s)
    );
  }

  goToDetails(id: number) {
    this.router.navigate([`/courses/${id}`]);
  }
}
