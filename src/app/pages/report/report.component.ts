import { VERTICAL_BAR } from './../../constants/charts';
import { Component } from '@angular/core';
import { CalendarData } from 'src/app/components/shared/calendar/calendar.component';
import { MONTHS } from 'src/app/constants/utils';
import { IDashbaord } from 'src/app/models/dashboard';
import { IFinance } from 'src/app/models/finance';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexXAxis,
  ChartType,
} from 'ng-apexcharts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  loading = false;

  finances_compact : CalendarData[] = [];
  finances: IFinance[] = [];

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
    ...VERTICAL_BAR,
    yaxis: {
      min: 0,
      max: 100,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: (val: number) => {
          return `${val}h`;
        },
      },
    },
    dataLabels: {
      ...VERTICAL_BAR.dataLabels,
      formatter: (val: number) => {
        return `${val}h`;
      },
    },
    colors: ['#0071ff', '#005acc', '#004399', '#002c65', '#001531'],
    xaxis: {

    } as ApexXAxis,
    series:
    [
      {
        data:[44, 55, 13, 43, 22],
        name: 'Entrada'
      }
    ] as ApexAxisChartSeries,
  };

}
