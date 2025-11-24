import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { AboutPageComponent } from './features/about-page/about-page.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';
import { UpdateUserComponent } from './features/users/update-user/update-user.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  { path: 'courses', component: CoursesListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutPageComponent },


  /** Admin updating any user */
  { 
    path: 'users/update/:id', 
    component: UpdateUserComponent
  },

  /** Admin only user list */
  { 
    path: 'user-list', 
    component: UserListComponent,
    canActivate: [AdminGuard]
  }
];
