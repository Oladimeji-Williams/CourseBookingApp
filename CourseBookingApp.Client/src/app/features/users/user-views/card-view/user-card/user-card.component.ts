import { Component, Input } from '@angular/core';
import { User } from '../../../../../core/models/entities/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private router: Router) {}
  goToUpdate() {
    this.router.navigate([`/users/update/${this.user.id}`]);
  }
}
