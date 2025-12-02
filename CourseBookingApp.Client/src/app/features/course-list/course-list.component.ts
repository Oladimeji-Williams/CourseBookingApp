import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from '../../core/models/entities/course.model';
import { CourseService } from '../../core/services/course/course.service';
import { CourseViewTableListComponent } from "../course-view-table-list/course-view-table-list.component";
import { CourseViewCardListComponent } from "../course-view-card-list/course-view-card-list.component";
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-course-list',
  imports: [CourseViewTableListComponent, CourseViewCardListComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  title: string = 'Available Courses'; 
  wishlist: Course[] = [];
  courses: Course[] = [];
  tableView = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap(params => this.courseService.getAllCourses())
      )
      .subscribe({
        next: data => (this.courses = data),
        error: err => console.error('Error fetching courses:', err)
      });
  }

  toggleView() {
    this.tableView = !this.tableView;
  }

  isInWishlist(course: Course): boolean {
    return this.wishlist.some(c => c.id === course.id);
  }

  onAddToWishList(course: Course) {
    this.wishlist = this.isInWishlist(course)
      ? this.wishlist.filter(c => c.id !== course.id)
      : [...this.wishlist, course];
  }

  onBookCourse(course: Course) {
    console.log(`Booked: ${course.title}`);
  }
}