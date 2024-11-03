import { configModals } from './../../constants/utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailFinanceComponent } from 'src/app/components/modals/detail-finance/detail-finance.component';
import { MONTHS } from 'src/app/constants/utils';
import { ITransaction } from 'src/app/models/finance';
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

  dataSource: ITransaction[] = [];
  backupFinancias: ITransaction[] = [];

  months = MONTHS;

  current_month = new Date().getMonth();
  current_year = new Date().getFullYear();

  total = 0;

  current_page = 1;
  count_page = 1;
  users_total_count = 0;
  prev = false;
  next = false;

  ngOnInit() {
    this.getAllFinances(1);
  }

  getAllFinances(page: number) {
    this.loading = true;

    const params = {
      page,
      year: this.current_year,
      month: this.months[this.current_month].month,
      return_all: true
    };

    this.financesService.getAllFinances(params).subscribe({
      next: (data) => {
        // this.backupFinancias = this.sortOrder(data.results);
        this.backupFinancias = data;
        this.dataSource = this.backupFinancias;

        // this.next = data.next != null;
        // this.prev = data.previous != null;
        // this.count_page = Math.ceil(data.count / 10);

        this.loading = false;
      },
    });
  }

    // Pagination
    backOrNextPage(event: any) {
      this.loading = true;
      this.current_page = event;
      this.getAllFinances(this.current_page);
    }

  sortOrder(array: ITransaction[]){
    return array.sort((a:ITransaction, b:ITransaction) => {
      const dateA = new Date(a.expiry_date).getTime();
      const dateB = new Date(b.expiry_date).getTime();
      return dateA - dateB;  // Ordena em ordem crescente
    });
  }

  craateFinance() {
    const dialogRef = this.dialog.open(DetailFinanceComponent, {
      ...configModals,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAllFinances(1);
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

    this.getAllFinances(1);
  }

  setMonthBoundaries(date: Date) {
    const firstDayOfMonth = new Date(this.current_year, date.getMonth(), 1);
    const lastDayOfMonth = new Date(this.current_year, date.getMonth() + 1, 0);

    return { firstDayOfMonth, lastDayOfMonth };
  }

  action(event: string) {
    if (['PAY', 'DELET', 'EDIT'].includes(event)) this.getAllFinances(1);
  }

  get totalForTheMonth() {
    return this.dataSource.reduce((total, el) => {
      // Extrair o valor e as parcelas
      const value =
        typeof el.value_installment === 'string'
          ? parseFloat(el.value_installment)
          : el.value_installment;

      if(el.type === 'INCOME') return total + 0;

      // Adicionar ao total a divisão do valor pelo número de parcelas
      return total + value;
    }, 0); // Iniciar o total em 0
  }
}
