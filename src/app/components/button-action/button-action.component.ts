import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
})
export class ButtonActionComponent {
  constructor(private authService: AuthService) {}


  open() {
    const navbar: any = document.getElementById('list-container');
    navbar.classList.toggle('active');
  }

  logof() {
    this.authService.logout();
  }
}
