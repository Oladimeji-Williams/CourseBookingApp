import { Component, OnInit } from '@angular/core';
import { CourseCardComponent } from "../course-card/course-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from '../../core/models/entities/course.model';
import { CourseService } from '../../core/services/course/course.service';

@Component({
  selector: 'app-course-list',
  imports: [CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CoursesListComponent implements OnInit {
  wishlist: Course[] = [];
  title: string = "Available Courses";
  courses: Course[] = [];
  constructor(private _courseService: CourseService, private route: ActivatedRoute, private router: Router){
    
  }

ngOnInit(): void {
  this.route.queryParamMap
    .pipe(
      switchMap(params => {
        const description = params.get('description');
        return this._courseService.getCourses(description);
      })
    )
    .subscribe({
      next: data => (this.courses = data),
      error: err => console.error("Error fetching courses:", err),
    });
}

  isInWishlist(course: Course): boolean{
    return this.wishlist.some(c => c.id === course.id);
  }
  onBookCourse(course: Course): void{
    console.log(`Parent heard about ${course.title}`);
  };
  onAddToWishList(course: Course) {
    this.wishlist = this.isInWishlist(course)
      ? this.wishlist.filter(c => c.id !== course.id)
      : [...this.wishlist, course];

    console.log("Wishlist updated:", this.wishlist);
  };

}
