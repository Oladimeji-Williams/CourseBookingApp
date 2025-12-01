import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserViewCardComponent } from '../user-view-card/user-view-card.component';
import { User } from '../../core/models/entities/user.model';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserViewTableListComponent } from "../user-view-table-list/user-view-table-list.component";
import { UserViewCardListComponent } from "../user-view-card-list/user-view-card-list.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserViewTableListComponent, UserViewCardListComponent],
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
