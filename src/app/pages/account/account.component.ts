import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailAccountComponent } from 'src/app/components/modals/detail-account/detail-account.component';
import { configModals } from 'src/app/constants/utils';
import { IAccount } from 'src/app/models/accounts';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private dialog: MatDialog
  ) {}

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

  craateAccount() {
    const dialogRef = this.dialog.open(DetailAccountComponent, {
      ...configModals,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags();
      }
    });
  }
}
