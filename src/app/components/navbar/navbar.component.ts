import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NAVBAR_PAGES } from 'src/app/constants/navbar';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  loading = false;

  navbarPages = NAVBAR_PAGES;

  version = environment.version;
  isMobile = window.innerWidth < 1024;

  user: IUser = {} as IUser;

  ngOnInit(): void {
    this.getMe();

    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
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
    this.authService.user$.subscribe((user) => {
      console.log(user);

      if (user) {
        this.user.picture = user.photoURL || '';
        this.user.username = user.displayName || '';
        this.user.email = user.email || '';

        // this.authService.currentUserSig.set({
        //   email: user.email!,
        //   username: user.displayName!,
        //   picture: user.photoURL!,
        // });
        this.router.navigate(['/']);
      } else {
        this.authService.currentUserSig.set(null);
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
