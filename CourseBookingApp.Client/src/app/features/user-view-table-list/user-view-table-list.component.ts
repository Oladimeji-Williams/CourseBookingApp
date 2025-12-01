import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserViewTableComponent } from '../user-view-table/user-view-table.component';
import { User } from '../../core/models/entities/user.model';

@Component({
  selector: 'app-user-view-table-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserViewTableComponent],
  templateUrl: './user-view-table-list.component.html',
  styleUrls: ['./user-view-table-list.component.css']
})
export class UserViewTableListComponent implements OnChanges {

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
      u.type?.toString().toLowerCase().includes(s)
    );
  }

  goToUpdate(id: number) {
    this.router.navigate([`/users/update/${id}`]);
  }
}
