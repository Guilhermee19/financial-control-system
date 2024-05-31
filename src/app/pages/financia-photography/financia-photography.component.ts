import { Component, OnInit } from '@angular/core';
import { MONTHS } from 'src/app/constants/utils';
import { IFinance } from 'src/app/models/finance';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-financia-photography',
  templateUrl: './financia-photography.component.html',
  styleUrls: ['./financia-photography.component.scss'],
})
export class FinanciaPhotographyComponent implements OnInit {
  constructor(private sinancesService: FinancesService) {}

  displayedColumns: string[] = [
    'tag',
    'date',
    'description',
    'value',
    'status',
    'payment_voucher',
  ];

  dataSource: IFinance[] = [];
  months = MONTHS;

  current_month = new Date();

  ngOnInit() {
    this.getAllFinances();
  }

  getAllFinances() {
    this.sinancesService.getAllFinances().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = data;
      },
    });
  }
}
