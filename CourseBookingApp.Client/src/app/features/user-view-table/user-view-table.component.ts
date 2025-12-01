
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/entities/user.model';

@Component({
  selector: 'tr[app-user-view-table]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-view-table.component.html',
  styleUrls: ['./user-view-table.component.css']
})
export class UserViewTableComponent {
  @Input() user!: User;
}

