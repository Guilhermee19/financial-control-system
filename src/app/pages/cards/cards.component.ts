import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  constructor(
    private cardService: CardService,
  ) {}

  loading = false;

  displayedColumns: string[] = [
    'name',
    // 'type_card',
    'credit_limit',
    'credit_due_date',
    'options',
  ];

  dataSource: ICard[] = [];

  ngOnInit() {
    this.getAlltags();
  }

  getAlltags() {
    this.loading = true;

    this.cardService.getAllCard(1).subscribe({
      next: (data) => {
        // this.backupFinancias = data.results;

        // this.changeMonth('today');
        this.dataSource = data.results;
        this.loading = false;
      },
    });
  }

}
