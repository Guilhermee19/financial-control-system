import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MONTHS } from 'src/app/constants/utils';

export interface CalendarData {
  id: number;
  date: string; // 'YYYY-MM-DD' format
  label: string;
  color: string;
}
interface Day {
  day: number;
  month: number;
  week: string;
  data: CalendarData[]; // Adicionar o array de dados
}

export interface EventCalandar {
  date:{
    day: number | undefined;
    month: number;
    year: number;
    week?: string
  }
  data?: CalendarData[],
  action: 'next' | 'back' | 'today' | 'click'
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  @Input() data: CalendarData[] = [];
  @Output() changeCalendar = new EventEmitter<EventCalandar>();

  months = MONTHS;

  name_week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  weeks: Day[][] = [];

  today: Day = this.getCurrentDay();

  ngOnInit() {
    this.setCalendar()
  }

  setCalendar(){
    this.weeks = this.getWeeksOfMonth(this.year, this.month+1);
    this.assignDataToDays();
  }

  getCurrentDay(): Day {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // getMonth() retorna o mês de 0 a 11, por isso adicionamos 1
    const week = daysOfWeek[today.getDay()]; // getDay() retorna o índice do dia da semana (0 = Domingo, 6 = Sábado)

    return {
      day,
      month,
      week,
      data: []
    };
  }

  checkToday(day: Day){
    return day.day === this.today.day && day.month === this.today.month
  }

  getWeeksOfMonth(year: number, month: number): Day[][] {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    const weeks: Day[][] = [];
    let currentWeek: Day[] = [];

    const firstDayOfWeek = firstDay.getDay();
    if (firstDayOfWeek !== 0) {
      const previousMonthLastDay = new Date(year, month - 1, 0).getDate();
      const previousMonth = month - 1 === 0 ? 12 : month - 1;
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = previousMonthLastDay - i;
        currentWeek.push({
          day,
          month: previousMonth,
          week: daysOfWeek[currentWeek.length],
          data: []
        });
      }
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();

      currentWeek.push({
        day,
        month,
        week: daysOfWeek[dayOfWeek],
        data: []
      });

      if (dayOfWeek === 6 || day === daysInMonth) {
        if (day === daysInMonth && dayOfWeek !== 6) {
          let nextMonthDay = 1;
          const nextMonth = month + 1 === 13 ? 1 : month + 1;
          for (let i = dayOfWeek + 1; i <= 6; i++) {
            currentWeek.push({
              day: nextMonthDay++,
              month: nextMonth,
              week: daysOfWeek[i],
              data: []
            });
          }
        }
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return weeks;
  }

  assignDataToDays(): void {
    this.data.forEach((calendarItem) => {
      const itemDate = new Date(calendarItem.date + 'T12:00:00');

      this.weeks.forEach((week) => {
        week.forEach((day) => {
          if (day.day === itemDate.getDate() && day.month === itemDate.getMonth() + 1) {
            day.data.push(calendarItem); // Adiciona os itens da data ao dia correspondente
          }
        });
      });
    });
  }

  selectDay(day: Day) {
    this.changeCalendar.emit({
      date:{
        day: day.day,
        month: day.month,
        year: this.year,
        week: day.week
      },
      data: day.data,
      action: 'click'
    });
  }

  changeMonth(action: 'next' | 'back' | 'today' | 'click') {
    if (action === 'back') {
      if (this.month > 0) {
        this.month--;
      } else {
        this.month = 11;
        this.year--;
      }
    }
    if (action === 'next') {
      if (this.month < 11) {
        this.month++;
      } else {
        this.month = 0;
        this.year++;
      }
    }
    if(action === 'today'){
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
    }

    setTimeout(() => {
      this.changeCalendar.emit({
        date:{
          day: undefined,
          month: this.month,
          year: this.year,
        },
        action
      });
    }, 10);

    this.setCalendar()
  }
}
