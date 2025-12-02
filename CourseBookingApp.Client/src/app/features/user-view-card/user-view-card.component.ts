import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/entities/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-view-card',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './user-view-card.component.html',
  styleUrl: './user-view-card.component.css'
})
export class UserViewCardComponent {
  @Input() user!: User;

  constructor(private router: Router) {}
  goToUpdate() {
    this.router.navigate([`/users/update/${this.user.id}`]);
  }
}
