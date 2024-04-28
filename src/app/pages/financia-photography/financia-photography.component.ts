import { Component, OnInit } from '@angular/core';
import { FINANCE } from 'src/app/constants/finance';
import { IFinance } from 'src/app/models/finance';

@Component({
  selector: 'app-financia-photography',
  templateUrl: './financia-photography.component.html',
  styleUrls: ['./financia-photography.component.scss']
})
export class FinanciaPhotographyComponent {

  // constructor() { }

  displayedColumns: string[] = ['tag', 'date', 'description', 'value', 'status', 'payment_voucher'];
  dataSource: IFinance[] = FINANCE;

  // ngOnInit(): void {
  // }

}
