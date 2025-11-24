import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'CourseBookingApp.Client';
  constructor(private router: Router, private auth: AuthService) {}
  goToMyProfile() {
    const id = this.auth.getUserIdFromToken();
    this.router.navigate([`/users/update/${id}`]);
  }

}


