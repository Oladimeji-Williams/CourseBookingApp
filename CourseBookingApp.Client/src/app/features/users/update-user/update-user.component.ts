// src/app/features/users/update-user/update-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../core/services/users/users.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserDto } from '../../../core/dtos/update-user-dto.interface';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  loading = false;
  previewImage = 'assets/default-profile.png';
  selectedFile: File | null = null;
  originalData: Record<string, string> = {};

  formGroup: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    // Initialize forms
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = Number(params.get('id'));
      // If param is missing or invalid (0/NaN) use logged-in user id
      if (!id || isNaN(id)) {
        id = this.authService.getUserIdFromToken();
      }
      this.loadUser(id);
    });
  }

  isCurrentUser = false;

  private loadUser(userId: number): void {
    if (!userId) {
      // nothing sensible to load
      console.error('No user id available to load user');
      return;
    }

    this.loading = true;
    this.userService.getById(userId).pipe(finalize(() => (this.loading = false))).subscribe({
      next: (u: any) => {
        this.originalData = {
          firstName: u.firstName ?? '',
          lastName: u.lastName ?? '',
          email: u.email ?? '',
          phone: u.phoneNumber ?? u.phone ?? '',
          address: u.physicalAddress ?? u.address ?? ''
        };
        this.formGroup.patchValue({
          firstName: this.originalData['firstName'],
          lastName: this.originalData['lastName'],
          email: this.originalData['email'],
          phone: this.originalData['phone'],
          address: this.originalData['address']
        });
        this.previewImage = u.img ?? this.previewImage;
        this.isCurrentUser = userId === this.authService.getUserIdFromToken();
      },
      error: (err) => {
        console.error('Failed loading user', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.previewImage = reader.result as string);
    reader.readAsDataURL(this.selectedFile);
  }

  save(): void {
    if (this.formGroup.invalid) {
      this.snackbar.open('Please fill required fields', 'Close', { duration: 2500 });
      return;
    }

    // Determine target user id (route param takes precedence, otherwise current user)
    const paramId = this.route.snapshot.paramMap.get('id');
    let userId = paramId ? Number(paramId) : 0;
    if (!userId || isNaN(userId)) {
      userId = this.authService.getUserIdFromToken();
    }

    if (!userId) {
      this.snackbar.open('Unable to determine user to update', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    const formValue = this.formGroup.getRawValue() as Record<string, string>;

    // Build payload using backend DTO naming: phoneNumber, physicalAddress
    const updates: UpdateUserDto = {};

    if (formValue['firstName'] !== this.originalData['firstName'])
      updates.firstName = formValue['firstName'];

    if (formValue['lastName'] !== this.originalData['lastName'])
      updates.lastName = formValue['lastName'];

    if (formValue['phone'] !== this.originalData['phone'])
      updates.phoneNumber = formValue['phone'];

    if (formValue['address'] !== this.originalData['address'])
      updates.physicalAddress = formValue['address'];


    // If no updates but there is an image selected, still proceed to upload image
    const hasUpdates = Object.keys(updates).length > 0;

    const finish = () => { this.loading = false; };

    const afterUpdate = () => {
      if (this.selectedFile) {
        this.userService.uploadProfilePicture(userId, this.selectedFile).subscribe({
          next: () => {
            this.snackbar.open('Profile & image updated', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
            this.loadUser(userId);
          },
          error: () => {
            this.snackbar.open('Profile updated but image upload failed', 'Close', { duration: 3500, panelClass: ['snackbar-error'] });
            this.loadUser(userId);
          }
        });
      } else {
        this.snackbar.open('Profile updated', 'Close', { duration: 2500, panelClass: ['snackbar-success'] });
        this.loadUser(userId);
      }
    };

    if (hasUpdates) {
      this.userService.updateUser(userId, updates).pipe(finalize(finish)).subscribe({
        next: () => afterUpdate(),
        error: (err) => {
          console.error(err);
          this.snackbar.open('Failed to update profile', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
        }
      });
    } else {
      // No textual updates — maybe only image upload
      if (this.selectedFile) {
        this.userService.uploadProfilePicture(userId, this.selectedFile).pipe(finalize(finish)).subscribe({
          next: () => {
            this.snackbar.open('Image uploaded', 'Close', { duration: 2500, panelClass: ['snackbar-success'] });
            this.loadUser(userId);
          },
          error: (err) => {
            console.error(err);
            this.snackbar.open('Image upload failed', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
          }
        });
      } else {
        this.loading = false;
        this.snackbar.open('Nothing to update', 'Close', { duration: 2000 });
      }
    }
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.snackbar.open('Please fill both passwords', 'Close', { duration: 2000 });
      return;
    }

    const oldPassword = this.passwordForm.value.oldPassword ?? '';
    const newPassword = this.passwordForm.value.newPassword ?? '';

    this.loading = true;
    this.userService.changePassword({ currentPassword: oldPassword, newPassword }).pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => {
        this.snackbar.open('Password changed', 'Close', { duration: 2500, panelClass: ['snackbar-success'] });
        this.passwordForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.snackbar.open('Failed to change password', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    });
  }
}
