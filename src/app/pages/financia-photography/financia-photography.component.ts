import { configModals } from './../../constants/utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailFinanceComponent } from 'src/app/components/modals/detail-finance/detail-finance.component';
import { MONTHS } from 'src/app/constants/utils';
import { IFinance } from 'src/app/models/finance';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-financia-photography',
  templateUrl: './financia-photography.component.html',
  styleUrls: ['./financia-photography.component.scss'],
})
export class FinanciaPhotographyComponent implements OnInit {
  constructor(
    private financesService: FinancesService,
    private dialog: MatDialog
  ) {}

  loading = false;

  dataSource: IFinance[] = [];
  backupFinancias: IFinance[] = [];

  months = MONTHS;

  current_month = new Date().getMonth();
  current_year = new Date().getFullYear();

  total = 0;

  ngOnInit() {
    this.getAllFinances();
  }

  getAllFinances() {
    this.loading = true;

    const params = {
      year: this.current_year,
      month: this.months[this.current_month].month,
    };

    this.financesService.getAllFinances(params).subscribe({
      next: (data) => {
        this.backupFinancias = data.results;

        // this.changeMonth('today');
        this.dataSource = this.backupFinancias;
        this.loading = false;
      },
    });
  }

  craateFinance() {
    const dialogRef = this.dialog.open(DetailFinanceComponent, {
      ...configModals,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAllFinances();
      }
    });
  }

  changeMonth(action: 'next' | 'back' | 'today') {
    if (action === 'back') {
      if (this.current_month > 0) {
        this.current_month--;
      } else {
        this.current_month = 11;
        this.current_year--;
      }
    }
    if (action === 'next') {
      if (this.current_month < 11) {
        this.current_month++;
      } else {
        this.current_month = 0;
        this.current_year++;
      }
    }

    this.getAllFinances();
  }

  setMonthBoundaries(date: Date) {
    const firstDayOfMonth = new Date(this.current_year, date.getMonth(), 1);
    const lastDayOfMonth = new Date(this.current_year, date.getMonth() + 1, 0);

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

  action(event: string) {
    console.log(event);
    if (event === 'DELET') this.getAllFinances();
  }

  get totalForTheMonth() {
    return this.dataSource.reduce((total, el) => {
      // Extrair o valor e as parcelas
      const value =
        typeof el.value === 'string' ? parseFloat(el.value) : el.value;
      // Adicionar ao total a divisão do valor pelo número de parcelas
      return total + value;
    }, 0); // Iniciar o total em 0
  }
}
