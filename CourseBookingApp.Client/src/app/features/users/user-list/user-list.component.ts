import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardListComponent } from '../user-views/card-view/user-card-list/user-card-list.component';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/users/users.service';
import { User } from '../../../core/models/entities/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserTableListComponent } from '../user-views/table-view/user-table-list/user-table-list.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserTableListComponent, UserCardListComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  tableView = true;     // default view
  isAdmin = false;       
  users: User[] = [];

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = this.auth.getCurrentUserRole();
    this.isAdmin = role === 'Admin';

    if (this.isAdmin) {
      this.userService.getAll().subscribe(u => this.users = u);
    }
  }

  toggleView() {
    this.tableView = !this.tableView;
  }

  // updateSelf() {
  //   const id = this.auth.getUserIdFromToken();
  //   this.router.navigate([`/users/update/${id}`]);
  // }
}
