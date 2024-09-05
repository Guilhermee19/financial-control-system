import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { BodyJson } from 'src/app/services/http.service';

export interface IDialogActions {
  action: 'yes' | 'no';
}

export interface IData {
  action: 'yes' | 'no';
}

@Component({
  selector: 'app-detail-account',
  templateUrl: './detail-account.component.html',
  styleUrls: ['./detail-account.component.scss'],
})
export class DetailAccountComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private accountsService: AccountsService
  ) {}

  loading = false;

  account_form = this.fb.group({
    name: ['', [Validators.required]],
    credit_due_date: [Validators.required],
    credit_limit: [0, [Validators.required]],
    is_debit: [false, [Validators.required]],
    is_credit: [false, [Validators.required]],
    balance_debit: [0],
    balance_credit: [0],
  });

  ngOnInit() {
    this.account_form.reset();
    this.account_form.patchValue({
      is_debit: false,
      is_credit: false,
      balance_debit: 0,
      balance_credit: 0,
    });
  }

  saveSubmitHandler() {
    if (this.loading) return;

    if (this.account_form.invalid) {
      this.account_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.postAccount();
  }

  postAccount() {
    const body = {
      ...this.account_form.value,
    } as BodyJson;

    this.accountsService.postAccount(body).subscribe();

    this.chance('yes');
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.account_form.value });
  }
}
