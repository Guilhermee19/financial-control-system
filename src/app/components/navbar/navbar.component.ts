import { MatSidenav } from '@angular/material/sidenav';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NAVBAR_PAGES } from 'src/app/constants/navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatSidenav = {} as MatSidenav;

  constructor(private storage: StorageService) {}

  loading = false;

  navbarPages = NAVBAR_PAGES;

  version = environment.version;
  isMobile = window.innerWidth < 1024;

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
    // Requisição para pegar o usuário logado
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }

 logout() {
    // const dialogRef = this.dialog.open(ConfirmExitComponent, {
    //   panelClass: 'dialog-container',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.authService.logout();
    //   }
    // });
  }
}
