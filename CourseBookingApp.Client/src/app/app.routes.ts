import { Routes } from '@angular/router';
import { CoursesListComponent } from './features/course-list/course-list.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';
import { AuthRegisterComponent } from './features/auth-register/auth-register.component';
import { UpdateUserComponent } from './features/user-update/user-update.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { Admin } from './core/guards/admin.guard';
import { AuthLoginComponent } from './features/auth-login/auth-login.component';
import { CourseUpdateComponent } from './features/course-update/course-update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  { path: 'courses', component: CoursesListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },

  // Overlay routes
  { path: 'login-overlay', component: AuthLoginComponent, outlet: 'overlay' },
  { path: 'register-overlay', component: AuthRegisterComponent, outlet: 'overlay' },

  { path: 'courses/update/:id', component: CourseUpdateComponent },

  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [Admin] }
];
