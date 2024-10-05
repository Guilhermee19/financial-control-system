import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFinance } from 'src/app/models/finance';
import { IDialogActions } from 'src/app/models/utils';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoryService } from 'src/app/services/category.service';
import { FinancesService } from 'src/app/services/finances.service';

export interface IData {
  finance: IFinance;
}

@Component({
  selector: 'app-finance-info',
  templateUrl: './finance-info.component.html',
  styleUrls: ['./finance-info.component.scss']
})
export class FinanceInfoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private financesService: FinancesService,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private accountsService: AccountsService,
    private categoryService: CategoryService
  ) {}


  ngOnInit() {
    console.log(this.data.finance);
  }

  editFinance(){
    console.log(this.data.finance);
  }

  deletFinance(){
    console.log(this.data.finance);
  }

  paymentInstallment(){
    console.log(this.data.finance);

    const body = {
      installment_id: this.data.finance.installment.id
    }

    this.financesService.payInstallment(body).subscribe({
      next: (data) => {
        console.log(data);

        this.chance('yes')
      }
    })
  }

  get status() {
    const hoje = new Date();
    const dataInput = new Date(this.data.finance.installment.date + 'T12:00:00'); // Data sem ajuste de hora

    // Pegue as informações de ano, mês e dia
    const hojeAno = hoje.getFullYear();
    const hojeMes = hoje.getMonth();
    const hojeDia = hoje.getDate();

    const dataAno = dataInput.getFullYear();
    const dataMes = dataInput.getMonth();
    const dataDia = dataInput.getDate();

    // Se a variável is_paid for true, retorna 'PAID'
    if (this.data.finance.installment.is_paid) {
      return 'PAID';
    }

    // Lógica para SOLD, WAITING, e PAY_TODAY
    if (
      dataAno < hojeAno ||
      (dataAno === hojeAno &&
        (dataMes < hojeMes || (dataMes === hojeMes && dataDia < hojeDia)))
    ) {
      return 'SOLD';
    } else if (
      dataAno > hojeAno ||
      (dataAno === hojeAno &&
        (dataMes > hojeMes || (dataMes === hojeMes && dataDia > hojeDia)))
    ) {
      return 'WAITING';
    } else {
      return 'PAY_TODAY';
    }
  }


  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance });
  }
}
