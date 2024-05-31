import { Component, OnInit, ViewChild } from '@angular/core';
// import { donutsChartOptions } from 'src/app/models/chart.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: any;

  constructor(private configService: ConfigService) {}

  // public chartOptions = {
  //   ...donutsChartOptions,
  //   series: [
  //     {
  //       name: 'Usuários',
  //       data: [],
  //     },
  //   ],
  // };

  // list_goals = this.configService.list_goals;

  // labels: string[] = [];
  // goals: number[] = [];
  // percent = 0;

  ngOnInit(): void {
    // this.labels = this.list_goals.map((item) => {
    //   return item.title;
    // });
    // this.chartOptions = {
    //   ...donutsChartOptions,
    //   series: [],
    //   labels: [],
    // };
    // this.updateSeries();
  }

  // chanceGoal(event: any, idx: number) {
  //   console.log(event);
  //   console.log(idx);
  //   this.list_goals[idx].goal = event.value;

  //   this.updateSeries();
  //   this.configService.updateGoals(this.list_goals);
  // }

  // updateSeries() {
  //   this.percent = 0;
  //   this.goals = this.list_goals.map((item) => {
  //     this.percent += item.goal;
  //     return item.goal;
  //   });

  //   (this.chartOptions.series as any) = this.goals;

  //   this.chartOptions.labels = this.labels;
  // }
}
