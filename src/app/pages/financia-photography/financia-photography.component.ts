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
  constructor(private financesService: FinancesService) {}

  loading = false;

  displayedColumns: string[] = [
    'tag',
    'date',
    'description',
    'value',
    'status',
    'payment_voucher',
    'options',
  ];

  dataSource: IFinance[] = [];
  backupFinancias: IFinance[] = [];

  months = MONTHS;

  current_month = new Date().getMonth();

  ngOnInit() {
    this.getAllFinances(this.current_month);
  }

  getAllFinances(month: number) {
    console.log(month);
    this.loading = true;

    const params = {
      _sort: 'date',
      _order: 'asc',
    };
    this.financesService.getAllFinances(params).subscribe({
      next: (data) => {
        this.backupFinancias = data;
        const today = new Date();
        const date = new Date(today.getFullYear() + '-' + (month + 1) + '-01');

        const firstAndLastDay = this.setMonthBoundaries(date);

        this.dataSource = this.filterData(
          this.backupFinancias,
          firstAndLastDay.firstDayOfMonth,
          firstAndLastDay.lastDayOfMonth
        );

        this.loading = false;
      },
    });
  }

  changeMonth(action: 'next' | 'back') {
    if (action === 'back')
      this.current_month = this.current_month > 0 ? this.current_month - 1 : 11;
    if (action === 'next')
      this.current_month = this.current_month < 11 ? this.current_month + 1 : 0;

    // this.getAllFinances(this.current_month);

    const today = new Date();
    const date = new Date(
      today.getFullYear() + '-' + (this.current_month + 1) + '-01'
    );

    const firstAndLastDay = this.setMonthBoundaries(date);

    this.dataSource = this.filterData(
      this.backupFinancias,
      firstAndLastDay.firstDayOfMonth,
      firstAndLastDay.lastDayOfMonth
    );
  }

  setMonthBoundaries(date: Date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return { firstDayOfMonth, lastDayOfMonth };
  }

  filterData(data: IFinance[], startDate: Date, endDate: Date) {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      return data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    } else {
      return data;
    }
  }
}
