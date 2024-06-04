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
  current_year = new Date().getFullYear();

  isEdit = -1;

  total = 0;

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
        this.changeMonth('today');
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
        if (result.action === 'yes') this.getAllFinances(this.current_month);
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

  modeEdit(index: number) {
    if (this.isEdit !== -1) return;
    this.isEdit = index;
  }

  get totalForTheMonth() {
    return this.dataSource.reduce((total, el) => {
      // Extrair o valor e as parcelas
      const value =
        typeof el.value === 'string' ? parseFloat(el.value) : el.value;
      const installments =
        typeof el.installments === 'string'
          ? parseFloat(el.installments)
          : el.installments;

      // Adicionar ao total a divisão do valor pelo número de parcelas
      return total + value / installments;
    }, 0); // Iniciar o total em 0
  }

  deletItem(id: number) {
    this.financesService.deletFinance(id).subscribe({
      next: (data) => {
        this.getAllFinances(this.current_month);
      },
    });
  }

  saveEdit() {
    this.isEdit = -1;
  }
}
