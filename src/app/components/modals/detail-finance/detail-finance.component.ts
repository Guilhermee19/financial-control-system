import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STATUS, TAGS } from 'src/app/constants/finance';
import { FinancesService } from 'src/app/services/finances.service';
import { BodyJson } from 'src/app/services/http.service';

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
export class DetailFinanceComponent {
  constructor(
    private fb: FormBuilder,
    private financesService: FinancesService,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {}

  loading = false;

  tags = TAGS;
  status = STATUS;

  finance_form = this.fb.group({
    tag: ['G', [Validators.required]],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    description: ['', [Validators.required]],
    value: [[Validators.required]],
    installments: [[Validators.required]],
    status: ['WAITING'],
    card: [this.fb.group({})],
    payment_voucher: [''],
  });

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
    let installments = this.finance_form.get('installments')?.value || 1;

    console.log(typeof installments);
    if (typeof installments !== 'number') {
      installments = 1;
    }

    const dataCompra = new Date(
      this.finance_form.value.date + 'T12:00:00' || 0
    );

    for (let i = 0; i < installments; i++) {
      console.log(dataCompra);

      const dataVencimento = new Date(dataCompra);
      console.log(dataVencimento);

      dataVencimento.setMonth(dataVencimento.getMonth() + i);

      const body = {
        tag: this.finance_form.value.tag || 'G',
        date: dataVencimento.toISOString(),
        description: this.finance_form.value.description || '',
        value: value || 1,
        installments,
        current_installment: i + 1,
        status: 'WAITING',
      };

      this.financesService.postFinance(body).subscribe();
    }

    this.chance('yes');
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.finance_form.value });
  }
}
