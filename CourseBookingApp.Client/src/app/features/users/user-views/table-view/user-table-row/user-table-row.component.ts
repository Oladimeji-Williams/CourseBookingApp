import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../core/models/entities/user.model';

@Component({
  selector: 'tr[app-user-table-row]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.css']
})
export class UserTableRowComponent {
  @Input() user!: User;
}

