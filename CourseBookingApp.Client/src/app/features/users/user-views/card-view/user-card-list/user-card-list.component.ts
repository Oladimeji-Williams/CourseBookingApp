import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../core/models/entities/user.model';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-card-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.css'
})
export class UserCardListComponent {
  @Input() users: User[] = [];
}
