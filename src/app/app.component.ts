import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private theme: ThemeService, private authService: AuthService) {}

  ngOnInit() {
    this.theme.loadCurrentTheme();
  }
}
