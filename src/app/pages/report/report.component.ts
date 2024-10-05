import { Component } from '@angular/core';
import { CalendarData } from 'src/app/components/shared/calendar/calendar.component';
import { MONTHS } from 'src/app/constants/utils';
import { IDashbaord } from 'src/app/models/dashboard';
import { IFinance } from 'src/app/models/finance';

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

}
