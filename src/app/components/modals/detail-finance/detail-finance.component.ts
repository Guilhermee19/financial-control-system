import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STATUS } from 'src/app/constants/finance';
import { IAccount } from 'src/app/models/accounts';
import { ITag } from 'src/app/models/tag';
import { AccountsService } from 'src/app/services/accounts.service';
import { FinancesService } from 'src/app/services/finances.service';
import { BodyJson } from 'src/app/services/http.service';
import { TagService } from 'src/app/services/tag.service';

export interface IDialogActions {
  action: 'yes' | 'no';
}

export interface IData {
  action: 'yes' | 'no';
}

@Component({
  selector: 'app-detail-finance',
  templateUrl: './detail-finance.component.html',
  styleUrls: ['./detail-finance.component.scss'],
})
export class DetailFinanceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private financesService: FinancesService,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private tagService: TagService,
    private accountsService: AccountsService
  ) {}

  loading = false;

  // tags = TAGS;
  tags: ITag[] = [];
  accounts: IAccount[] = [];
  status = STATUS;

  finance_form = this.fb.group({
    tag: [0, [Validators.required]],
    account: [],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    description: ['', [Validators.required]],
    value: [[Validators.required]],
    installments: [0],
    card: [this.fb.group({})],
    payment_voucher: [''],
  });

  ngOnInit() {
    this.finance_form.reset();

    this.finance_form.patchValue({
      date: new Date().toISOString().split('T')[0],
    });
    this.getAlltags();
  }

  getAlltags() {
    this.loading = true;

    this.tagService.getAlltags().subscribe({
      next: (data) => {
        this.tags = data.results;
        this.getAllAccounts();
      },
      error: () => {
        this.getAllAccounts();
      },
    });
  }

  getAllAccounts() {
    this.loading = true;

    this.accountsService.getAllAccounts(1, true).subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
      },
    });
  }

  saveSubmitHandler() {
    if (this.loading) return;

    if (this.finance_form.invalid) {
      this.finance_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.createFinance();
  }

  createFinance() {
    const value = this.finance_form.get('value')?.value || 0;
    const installments = this.finance_form.get('installments')?.value || 1;

    const dataCompra = new Date(
      this.finance_form.value.date + 'T12:00:00' || 0
    );

    const body = {
      tag: this.finance_form.value.tag || 0,
      account: this.finance_form.value.account,
      date: dataCompra.toISOString().split('T')[0],
      value: value || 1,
      is_cash: true,
      is_installments: false,
      number_of_installments: installments,
      description: this.finance_form.value.description || '',
    };

    this.financesService.postFinance(body as unknown as BodyJson).subscribe({
      next: () => {
        this.chance('yes');
      },
    });
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.finance_form.value });
  }
}
