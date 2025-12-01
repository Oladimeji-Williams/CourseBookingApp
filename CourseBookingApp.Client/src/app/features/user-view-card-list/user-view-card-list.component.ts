import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewCardComponent } from '../user-view-card/user-view-card.component';
import { User } from '../../core/models/entities/user.model';

@Component({
  selector: 'app-user-view-card-list',
  standalone: true,
  imports: [CommonModule, UserViewCardComponent],
  templateUrl: './user-view-card-list.component.html',
  styleUrl: './user-view-card-list.component.css'
})
export class UserViewCardListComponent {
  @Input() users: User[] = [];
}
