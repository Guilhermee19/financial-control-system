import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private configService: ConfigService) {
    console.log('');
  }

  salary = 3500;

  list_goals = this.configService.list_goals;

  ngOnInit(): void {
    console.log('-', this.list_goals);
  }
}
