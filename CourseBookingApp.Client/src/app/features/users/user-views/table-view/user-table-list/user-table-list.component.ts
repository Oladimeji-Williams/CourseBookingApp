import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../../core/models/entities/user.model';
import { UserTableRowComponent } from '../user-table-row/user-table-row.component';

@Component({
  selector: 'app-user-table-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserTableRowComponent],
  templateUrl: './user-table-list.component.html',
  styleUrls: ['./user-table-list.component.css']
})
export class UserTableListComponent implements OnChanges {

  @Input() users: User[] = [];
  filteredUsers: User[] = [];
  search = '';

  constructor(private router: Router) {}

  ngOnChanges() {
    this.filteredUsers = this.users;
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.email.toLowerCase().includes(s) ||
      u.firstName?.toLowerCase().includes(s) ||
      u.lastName?.toLowerCase().includes(s) ||
      u.type?.toLowerCase().includes(s)
    );
  }

  goToUpdate(id: number) {
    this.router.navigate([`/users/update/${id}`]);
  }
}
