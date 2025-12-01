import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'CourseBookingApp.Client';
  constructor(public _themeService: ThemeService, private router: Router, private auth: AuthService) {}

  toggleTheme(): void{
    this._themeService.toggleTheme();
  }
  goToMyProfile(): void {
    const id = this.auth.getUserIdFromToken();
    this.router.navigate([`/users/update/${id}`]);
  }

}


