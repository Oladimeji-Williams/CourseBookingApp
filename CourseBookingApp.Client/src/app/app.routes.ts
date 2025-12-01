import { Routes } from '@angular/router';
import { CoursesListComponent } from './features/course-list/course-list.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';
import { RegisterComponent } from './features/auth-register/auth-register.component';
import { UpdateUserComponent } from './features/user-update/user-update.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { Admin } from './core/guards/admin.guard';
import { AuthLoginComponent } from './features/auth-login/auth-login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  { path: 'courses', component: CoursesListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },

  { path: 'login', component: AuthLoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'about-us', component: AboutPageComponent },


  /** Admin updating any user */
  { 
    path: 'users/update/:id', 
    component: UpdateUserComponent
  },

  /** Admin only user list */
  { 
    path: 'user-list', 
    component: UserListComponent,
    canActivate: [Admin]
  }
];
