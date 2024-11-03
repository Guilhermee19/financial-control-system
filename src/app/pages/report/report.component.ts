import { LINE_GRAPHIC } from './../../constants/charts';
import { Component, OnInit } from '@angular/core';
import { CalendarData } from 'src/app/components/shared/calendar/calendar.component';
import { MONTHS } from 'src/app/constants/utils';
import { IDashbaord } from 'src/app/models/dashboard';
import { ITransaction } from 'src/app/models/finance';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
  ) {}

  loading = false;

  finances_compact : CalendarData[] = [];
  finances: ITransaction[] = [];

  months = MONTHS;

  current_month = new Date().getMonth();
  current_year = new Date().getFullYear();

  dashboard: IDashbaord = {
    total_day_income: 0,
    total_month_income: 0,
    total_day_expenditure: 0,
    total_month_expenditure: 0,
  } as IDashbaord;

  graphic_summary = {
    ...LINE_GRAPHIC,
    colors: ['#05ac78', '#f33167'],
    yaxis: {
      max: 10000, // Definindo o valor máximo do eixo Y
      labels: {
        formatter: (value: number) => {
          // Limita os valores e adiciona "R$"
          return `R$ ${value.toFixed(2)}`; // Exemplo: divide por 1000 para simplificar
        }
      }
    },
    series: [
      {
        name: "Entrada",
        data: [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500]
      },
      {
        name: "Saida",
        data: [100, 410, 350, 510, 490, 620, 69, 910, 1480]
      }
    ],
  };

  ngOnInit() {
    this.getDashboard();
    this.getAllFinances();
  }

  getDashboard(){
    const params = {
      year: this.current_year,
      month: this.months[this.current_month].month,
    };

    this.dashboardService.getDashboard(params).subscribe({
      next: (data) => {
        this.dashboard = data;

        this.graphic_summary.series =
        [
          {
            name: "Entrada",
            data: data.transaction_summary_income.map(el => el.value_total)
          },
          {
            name: "Saida",
            data: data.transaction_summary_expenditure.map(el => el.value_total)
          },
        ];

        this.graphic_summary.xaxis = {
          categories: data.transaction_summary_expenditure.map(el => el.day),
        }

        const valorIncome = data.transaction_summary_income[data.transaction_summary_income.length-1].value_total;
        const valorExpenditure = data.transaction_summary_expenditure[data.transaction_summary_expenditure.length-1].value_total;

        this.graphic_summary.yaxis.max = this.proximoMilharAcima(valorIncome > valorExpenditure? valorIncome : valorExpenditure) + 1000
      }
    })
  }

  proximoMilharAcima(numero: number): number {
    // Se o número já for um múltiplo de mil, retorna ele mesmo
    if (numero % 1000 === 0) {
      return numero;
    }

    // Calcula o próximo múltiplo de mil
    return Math.ceil(numero / 1000) * 1000;
  }

  getAllFinances() {
    this.loading = true;

    const params = {
      return_all: true,
      year: this.current_year,
      month: this.months[this.current_month].month,
    };

    this.dashboardService.getAllFinances(params).subscribe({
      next: (data) => {
        this.finances = this.sortOrder(data);

        this.loading = false;
      },
    });
  }

  sortOrder(array: ITransaction[]){
    return array.sort((a:ITransaction, b:ITransaction) => {
      const dateA = new Date(a.expiry_date).getTime();
      const dateB = new Date(b.expiry_date).getTime();
      return dateA - dateB;  // Ordena em ordem crescente
    });
  }
}
