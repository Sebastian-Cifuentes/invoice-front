import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  user!: User;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getUserCurrent();
  }

  getUserCurrent() {
    this.authService.userCurrent()
      .subscribe(({user}) => {
        this.user = user;
      });
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
    localStorage.clear();
  }

}
