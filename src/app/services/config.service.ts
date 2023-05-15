import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {
    console.log();
  }

  list_goals = [
    { title: 'Custos fixos', color: '#008ffb', goal: 20 },
    { title: 'Investimento', color: '#00e396', goal: 20 },
    { title: 'Conforto', color: '#feb019', goal: 20 },
    { title: 'Metas', color: '#ff4560', goal: 20 },
    { title: 'Reserva Emergencia', color: '#775dd0', goal: 20 },
  ];

  updateGoals(list: any) {
    localStorage.setItem('__GOALS__', JSON.stringify(list));
  }

  setGoals() {
    this.list_goals = JSON.parse(localStorage.getItem('__GOALS__') || '');
  }
}
