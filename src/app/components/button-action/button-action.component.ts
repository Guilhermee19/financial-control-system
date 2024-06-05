import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
})
export class ButtonActionComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('');
  }

  open() {
    const navbar: any = document.getElementById('list-container');
    navbar.classList.toggle('active');
  }

  logof() {
    this.authService.logout();
  }
}
