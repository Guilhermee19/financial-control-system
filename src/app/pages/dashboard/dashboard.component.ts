import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDashboardComponent } from 'src/app/components/modals/preview-dashboard/preview-dashboard.component';
import { CalendarData, EventCalandar } from 'src/app/components/shared/calendar/calendar.component';
import { configModals, MONTHS } from 'src/app/constants/utils';
import { IDashbaord } from 'src/app/models/dashboard';
import { IFinance } from 'src/app/models/finance';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

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

  ngOnInit() {
    this.getDashboard();
    this.getAllFinances();
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

        this.finances_compact = this.finances.map(el => {
          return {
            id: el.installment.id,
            date: el.installment.date,
            label: el.description,
            color: el.category_obj?.color || '#64c6e8'
          }
        });

        this.loading = false;
      },
    });
  }

  setCalendar(event: EventCalandar){
    console.log(event);

    if(['next', 'back', 'today'].includes(event.action)){
      this.current_month = event.date.month;
      this.current_year = event.date.year;

      this.getDashboard();
      this.getAllFinances();
    }
    if(event.action === 'click'){
      if(!event.data || event.data.length <= 0) return;

      const ids = event.data.map(item => item.id);

      const finances = this.finances.filter(el => ids.includes(el.installment.id));

      this.openPreview(event, finances)
    }
  }

  openPreview(event: EventCalandar, finances: IFinance[]) {
    this.dialog.open(PreviewDashboardComponent, {
      ...configModals,
      data: {
        finances,
        date: event.date
      }
    });

  }

  getDashboard(){
    const params = {
      year: this.current_year,
      month: this.months[this.current_month].month,
    };

    this.dashboardService.getDashboard(params).subscribe({
      next: (data) => {
        this.dashboard = data;
      }
    })
  }

  sortOrder(array: IFinance[]){
    return array.sort((a:IFinance, b:IFinance) => {
      const dateA = new Date(a.installment?.date).getTime();
      const dateB = new Date(b.installment?.date).getTime();
      return dateA - dateB;  // Ordena em ordem crescente
    });
  }

}
