import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  accounts: any = [
    {
      id: 0,
      dueDate: '2023-01-27T12:00:00',
      description: 'Seguro do carro',
      price: 250,
      status: 'PAID_OUT'
    },
    {
      id: 0,
      dueDate: '2023-05-27T12:00:00',
      description: 'Seguro do carro',
      price: 250,
      status: 'WAITING'
    }
  ]

  ngOnInit(): void {
  }

}
