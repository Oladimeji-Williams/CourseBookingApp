// src/app/features/users/update-user/update-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/entities/user.model';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserMapper } from '../../core/mappers/user.mapper';
import { UpdateUserDto } from '../../core/dtos/user.dto';

@Component({
  selector: 'app-user-update',
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
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UpdateUserComponent implements OnInit {

  loading = false;
  previewImage = 'assets/default-profile.png';
  selectedFile: File | null = null;

  /** Store original values to detect if the user changed anything */
  originalUser!: User;

  formGroup: FormGroup;
  passwordForm: FormGroup;

  isCurrentUser = false;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
    private _activedRoute: ActivatedRoute
  ) {

    this.formGroup = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [''],
      physicalAddress: ['']
    });

    this.passwordForm = this._fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this._activedRoute.paramMap.subscribe(params => {
      let id = Number(params.get('id'));

      if (!id || isNaN(id)) {
        id = this._authService.getUserIdFromToken();
      }

      this.loadUser(id);
    });
  }

  private loadUser(userId: number): void {
    if (!userId) return;

    this.loading = true;

    this._userService.getById(userId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (dto: any) => {
          const user = UserMapper.fromApi(dto);
          this.originalUser = user;

          this.formGroup.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber ?? '',
            physicalAddress: user.physicalAddress ?? ''
          });

          this.previewImage = user.img ?? this.previewImage;

          this.isCurrentUser = userId === this._authService.getUserIdFromToken();
        },
        error: (err) => console.error('Failed loading user', err)
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.previewImage = reader.result as string);
    reader.readAsDataURL(this.selectedFile);
  }

  save(): void {
    if (this.formGroup.invalid) {
      this._snackbar.open('Please fill required fields', 'Close', { duration: 2500 });
      return;
    }

    const paramId = this._activedRoute.snapshot.paramMap.get('id');
    let userId = paramId ? Number(paramId) : 0;

    if (!userId || isNaN(userId)) {
      userId = this._authService.getUserIdFromToken();
    }

    if (!userId) {
      this._snackbar.open('Unable to determine user to update', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    const formValue = this.formGroup.getRawValue();

    // Build DTO using mapper
    const updates: UpdateUserDto = UserMapper.toUpdateDto(formValue);

    // Remove fields that did not change
    if (updates.firstName === this.originalUser.firstName) delete updates.firstName;
    if (updates.lastName === this.originalUser.lastName) delete updates.lastName;
    if (updates.phoneNumber === this.originalUser.phoneNumber) delete updates.phoneNumber;
    if (updates.physicalAddress === this.originalUser.physicalAddress) delete updates.physicalAddress;

    const hasUpdates = Object.keys(updates).length > 0;

    const afterUpdate = () => {
      if (this.selectedFile) {
        this._userService.uploadProfilePicture(userId, this.selectedFile).subscribe({
          next: () => {
            this._snackbar.open('Profile updated + Image uploaded', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            this.loadUser(userId);
          },
          error: () => {
            this._snackbar.open('Profile updated but image upload failed', 'Close', {
              duration: 3500,
              panelClass: ['snackbar-error']
            });
            this.loadUser(userId);
          }
        });
      } else {
        this._snackbar.open('Profile updated', 'Close', { duration: 2500 });
        this.loadUser(userId);
      }
    };

    if (hasUpdates) {
      this._userService.updateUser(userId, updates)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () => afterUpdate(),
          error: () =>
            this._snackbar.open('Failed to update profile', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            })
        });
    } else {
      // Only image upload?
      if (this.selectedFile) {
        this._userService.uploadProfilePicture(userId, this.selectedFile)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: () => {
              this._snackbar.open('Image uploaded', 'Close', { duration: 2500 });
              this.loadUser(userId);
            },
            error: () =>
              this._snackbar.open('Image upload failed', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-error']
              })
          });
      } else {
        this.loading = false;
        this._snackbar.open('Nothing to update', 'Close', { duration: 2000 });
      }
    }
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      this._snackbar.open('Please fill both passwords', 'Close', { duration: 2000 });
      return;
    }

    const oldPassword = this.passwordForm.value.oldPassword ?? '';
    const newPassword = this.passwordForm.value.newPassword ?? '';

    this.loading = true;

    this._userService.changePassword({ currentPassword: oldPassword, newPassword })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this._snackbar.open('Password changed', 'Close', {
            duration: 2500,
            panelClass: ['snackbar-success']
          });
          this.passwordForm.reset();
        },
        error: () =>
          this._snackbar.open('Failed to change password', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          })
      });
  }
}
