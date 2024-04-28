import { Component, OnInit } from '@angular/core';
import { FINANCE } from 'src/app/constants/finance';
import { MONTHS } from 'src/app/constants/utils';
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

  months = MONTHS

  // ngOnInit(): void {
  // }

}
