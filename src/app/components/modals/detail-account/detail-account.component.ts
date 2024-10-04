import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ACCOUNTS } from 'src/app/constants/account';
import { IDialogActions } from 'src/app/models/utils';
import { AccountsService } from 'src/app/services/accounts.service';
import { BodyJson } from 'src/app/services/http.service';

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
    account: [''],
    name: ['', [Validators.required]],
    credit_due_date: [Validators.required],
    credit_limit: [0, [Validators.required]],
    is_debit: [false, [Validators.required]],
    is_credit: [false, [Validators.required]],
    balance_debit: [0],
    balance_credit: [0],
  });

  accounts = ACCOUNTS


  ngOnInit() {
    this.account_form.reset();
    this.account_form.patchValue({
      is_debit: false,
      is_credit: false,
      balance_debit: 0,
      balance_credit: 0,
    });
  }

  setAccount() {
    // Encontra a conta com base no valor selecionado no formulário
    const account = ACCOUNTS.find(el => el.name === this.account_form.value.account);

    // Se a conta não existir ou o nome da conta não for "other"
    if (account && account.name !== 'other') {
      const formAccount = this.account_form.get('name');

      if (formAccount) {
        // Atualiza o valor do FormControl com o nome da conta
        formAccount.patchValue(account.name);

        // Desabilita o campo para impedir a edição
        // formAccount.disable();
      }
    } else {
      // Se for "other", reativa o campo para permitir a edição
      const formAccount = this.account_form.get('name');
      if (formAccount) {
        formAccount.enable();  // Ativa o campo novamente para edição
        formAccount.patchValue('');  // Limpa o valor anterior se necessário
      }
    }
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
    };

    this.accountsService.postAccount(body as unknown as BodyJson).subscribe({
      next: () => {
        this.chance('yes');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.account_form.value });
  }
}
