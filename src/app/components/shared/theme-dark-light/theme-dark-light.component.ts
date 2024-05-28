import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-dark-light',
  templateUrl: './theme-dark-light.component.html',
  styleUrls: ['./theme-dark-light.component.scss'],
})
export class ThemeDarkLightComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  light = false;

  ngOnInit(): void {
    this.light = this.themeService.theme === 'light';
  }

  toggleTheme() {
    this.themeService.toggleUserTheme();
    this.light = !this.light;
  }
}
