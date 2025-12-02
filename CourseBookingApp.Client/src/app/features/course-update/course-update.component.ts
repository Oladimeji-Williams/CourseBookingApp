import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CourseService } from '../../core/services/course/course.service';
import { Course } from '../../core/models/entities/course.model';

@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {
  loading = false;
  previewImage = 'assets/default-course.png';
  selectedFile: File | null = null;
  originalData: Partial<Course> = {};

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      status: [false]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadCourse(id);
  }

  private loadCourse(courseId: number) {
    this.loading = true;
    this.courseService.getCourseById(courseId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: course => {
          this.originalData = course;
          this.formGroup.patchValue({
            title: course.title,
            description: course.description,
            price: course.price,
            status: course.soldOut
          });
          this.previewImage = course.img || this.previewImage;
        },
        error: () => this.snackbar.open('Failed to load course', 'Close', { duration: 2500 })
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

  save() {
    if (this.formGroup.invalid) return;

    const formValue = this.formGroup.value;
    const updates: Partial<Course> = {};

    if (formValue.title !== this.originalData.title) updates.title = formValue.title;
    if (formValue.description !== this.originalData.description) updates.description = formValue.description;
    if (formValue.price !== this.originalData.price) updates.price = formValue.price;
    if (formValue.status !== this.originalData.soldOut) updates.soldOut = formValue.status;

    this.loading = true;
    const finish = () => this.loading = false;

    const afterUpdate = () => {
      if (this.selectedFile) {
        this.courseService.uploadCourseImage(this.originalData.id!, this.selectedFile).subscribe({
          next: () => this.snackbar.open('Course & image updated', 'Close', { duration: 3000 }),
          error: () => this.snackbar.open('Course updated but image upload failed', 'Close', { duration: 3000 })
        });
      } else {
        this.snackbar.open('Course updated', 'Close', { duration: 2500 });
      }
      this.loadCourse(this.originalData.id!);
    };

    if (Object.keys(updates).length) {
      this.courseService.updateCourse(this.originalData.id!, updates)
        .pipe(finalize(finish))
        .subscribe({ next: afterUpdate, error: () => this.snackbar.open('Failed to update course', 'Close', { duration: 3000 }) });
    } else if (this.selectedFile) {
      this.courseService.uploadCourseImage(this.originalData.id!, this.selectedFile)
        .pipe(finalize(finish))
        .subscribe({ next: () => this.snackbar.open('Image uploaded', 'Close', { duration: 2500 }) });
    } else {
      finish();
      this.snackbar.open('Nothing to update', 'Close', { duration: 2000 });
    }
  }
}
