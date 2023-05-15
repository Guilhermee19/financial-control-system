import { ConfigService } from 'src/app/services/config.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private storage: StorageService,
    private configService: ConfigService
  ) {}

  loading = true;
  showFiller = false;

  ngOnInit(): void {
    this.getMe();

    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });

    this.configService.setGoals();

    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  getMe() {
    // Requisição para pegar o usuário logado
    // if (error?.status === 401) {
    //   this.storageService.logout();
    // }
  }
}
