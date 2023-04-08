import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
})
export class ButtonActionComponent implements OnInit {
  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    console.log('');
  }

  open() {
    const navbar: any = document.getElementById('list-container');
    navbar.classList.toggle('active');
  }

  logof() {
    this.storage.logout();
  }
}
