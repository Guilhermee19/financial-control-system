import { UserService } from './../../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NAVBAR_PAGES } from 'src/app/constants/navbar';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatSidenav = {} as MatSidenav;

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  loading = true;

  navbarPages = NAVBAR_PAGES;

  version = environment.version;
  isMobile = window.innerWidth < 1024;

  user: IUser = {} as IUser;

  notification = 0;

  ngOnInit(): void {
    this.getMe();

    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  getNotification(){
    this.userService.getNotification().subscribe({
      next: (data) =>{
        this.notification = data.length;
      }
    })
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  drawerToggle() {
    this.drawer.toggle();
    setTimeout(() => {
      dispatchEvent(new Event('resize'));
    }, 300);
  }

  getMe() {
    this.user = this.storage.myself;

    if (this.storage.token) {
      this.loading = true;
      this.userService.getMe().subscribe({
        next: (data) => {
          this.user = data;
          this.storage.myself = data;

          this.loading = false;
        },
        error: (error) => {
          if (error?.status === 401) {
            this.storage.logout();
          }
          this.loading = false;
        },
      });
    } else {
      this.storage.logout();
    }
  }

  logout() {
    this.authService.logout();
  }
}
