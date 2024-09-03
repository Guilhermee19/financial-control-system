import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/accounts';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private accountsService: AccountsService) {}

  loading = false;

  displayedColumns: string[] = [
    'name',
    'type_card',
    'credit_limit',
    'credit_due_date',
    // 'options',
  ];

  dataSource: IAccount[] = [];

  ngOnInit() {
    this.getAlltags();
  }

  getAlltags() {
    this.loading = true;

    this.accountsService.getAccounts(1).subscribe({
      next: (data) => {
        // this.backupFinancias = data.results;
        // console.log(this.backupFinancias);

        // this.changeMonth('today');
        this.dataSource = data.results;
        this.loading = false;
      },
    });
  }

  craateCategory() {
    console.log('');
  }
}
