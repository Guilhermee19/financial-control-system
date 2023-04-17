import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
    console.log('');
  }

  salary = 3500;

  tax = {
    fixedAccounts: 0.5,
    investment: 0.2,
    expenses: 0.3,
  };

  ngOnInit(): void {
    console.log('');
  }
}
