import { Component, Input, OnInit } from '@angular/core';

interface Day{
  day: number, month: number, week: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() month: number = new Date().getMonth()+1;
  @Input() year: number = new Date().getFullYear();

  month_name = 'Setembro';
  month_year = 2024;

  name_week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  weeks = this.getWeeksOfMonth(this.year, this.month);

  today: Day = this.getCurrentDay()

  ngOnInit(){
    console.log(this.weeks);
  }

  getCurrentDay(): { day: number, month: number, week: string } {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // getMonth() retorna o mês de 0 a 11, por isso adicionamos 1
    const week = daysOfWeek[today.getDay()]; // getDay() retorna o índice do dia da semana (0 = Domingo, 6 = Sábado)

    return {
      day,
      month,
      week
    };
  }

  getWeeksOfMonth(year: number, month: number): Day[][] {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Obter o primeiro dia do mês
    const firstDay = new Date(year, month - 1, 1);
    // Obter o último dia do mês
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    const weeks: { day: number, month: number, week: string }[][] = [];
    let currentWeek: { day: number, month: number, week: string }[] = [];

    // Preencher os dias da semana antes do primeiro dia do mês
    const firstDayOfWeek = firstDay.getDay(); // 0 = Domingo, 6 = Sábado
    if (firstDayOfWeek !== 0) {
      const previousMonthLastDay = new Date(year, month - 1, 0).getDate(); // Último dia do mês anterior
      const previousMonth = month - 1 === 0 ? 12 : month - 1;
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = previousMonthLastDay - i;
        currentWeek.push({
          day,
          month: previousMonth,
          week: daysOfWeek[currentWeek.length]
        });
      }
    }

    // Preencher os dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();

      currentWeek.push({
        day,
        month,
        week: daysOfWeek[dayOfWeek]
      });

      // Se for sábado ou o último dia do mês, finalize a semana
      if (dayOfWeek === 6 || day === daysInMonth) {
        // Preencher dias da semana seguinte se a última semana estiver incompleta
        if (day === daysInMonth && dayOfWeek !== 6) {
          let nextMonthDay = 1;
          const nextMonth = month + 1 === 13 ? 1 : month + 1;
          for (let i = dayOfWeek + 1; i <= 6; i++) {
            currentWeek.push({
              day: nextMonthDay++,
              month: nextMonth,
              week: daysOfWeek[i]
            });
          }
        }

        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return weeks;
  }

  selectDay(day: Day){
    console.log(day);
  }
}
