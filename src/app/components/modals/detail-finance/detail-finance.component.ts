import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { STATUS } from 'src/app/constants/finance';
import { IAccount } from 'src/app/models/accounts';
import { ICategory } from 'src/app/models/category';
import { IFinance } from 'src/app/models/finance';
import { IDialogActions } from 'src/app/models/utils';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoryService } from 'src/app/services/category.service';
import { FinancesService } from 'src/app/services/finances.service';
import { BodyJson } from 'src/app/services/http.service';

export interface IData {
  finance?: IFinance;
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
    private accountsService: AccountsService,
    private categoryService: CategoryService
  ) {}

  loading = false;
  phase = 0;

  // tags = TAGS;
  categories: ICategory[] = [];
  accounts: IAccount[] = [];
  status = STATUS;

  finance_form = this.fb.group({
    category: [0],
    account: [0],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    description: ['', [Validators.required]],
    value: [0, [Validators.required]],
    installments: [0],
    card: [this.fb.group({})],
    payment_voucher: [''],
    recurrence: [''],
    type: [''],
    screen: ['receita'],
    edit_all: [false]
  });

  is_invoice = this.fb.control(false)

  recurrences = [
    {name: 'WEEKLY', label: 'semanal'},
    {name: 'MONTHLY', label: 'mensal'},
    {name: 'ANNUAL', label: 'anual'},
  ];

  ngOnInit() {
    this.finance_form.reset();

    if(this.data?.finance){
      console.log('EDITAR');

      this.phase = 1;

      this.finance_form.patchValue({
        screen: this.data.finance.type === 'INCOME' ? 'receita' : 'despesa',
        value: this.data.finance.installment.installment_value,
        description: this.data.finance.description,
        category: this.data.finance.category,
        account: this.data.finance.account,
        date: this.data.finance.installment.date,
        recurrence: this.data.finance.recurrence,
        installments: this.data.finance.number_of_installments,
      });
    }

    this.finance_form.patchValue({
      date: new Date().toISOString().split('T')[0],
    });
    this.getAlltags();
  }

  getAlltags() {
    this.loading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.results;
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

  setTag(){
    const filter = this.categories.find(el => el.id === (this.finance_form.value.category || 0))
    // if(filter) this.finance_form.get('description')?.patchValue(filter?.name || '')
  }

  saveSubmitHandler() {
    console.log(this.finance_form.value);

    if (this.loading) return;

    if (this.finance_form.invalid) {
      this.finance_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    if(!this.data?.finance?.id){
      this.createFinance();
    }
    else{
      this.patchFinance()
    }

  }

  createFinance() {
    const value = this.finance_form.get('value')?.value || 0;
    const installments = this.finance_form.get('installments')?.value || 1;

    const dataCompra = new Date(
      this.finance_form.value.date + 'T12:00:00' || 0
    );

    const body = {
      category: this.finance_form.value.category,
      account: this.finance_form.value.account,
      date: dataCompra.toISOString().split('T')[0],
      value: value || 1,
      number_of_installments: installments,
      description: this.finance_form.value.description || '',
      recurrence: this.setRecurrence(this.finance_form.value.recurrence || this.finance_form.value.type),
      type: this.setType(this.finance_form.value.screen)
    };

    this.financesService.postFinance(body as unknown as BodyJson).subscribe({
      next: () => {
        this.chance('yes');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  patchFinance() {
    if(!this.data.finance?.id) return;

    const value = this.finance_form.get('value')?.value || 0;
    const installments = this.finance_form.get('installments')?.value || 1;

    // Pegando e formatando a data da compra
    const dataCompra = new Date(
      this.finance_form.value.date + 'T12:00:00' || 0
    );

    const body: any = {
      description: this.finance_form.value.description || '',
      date: dataCompra.toISOString().split('T')[0], // Incluindo a data
      account: this.finance_form.value.account,
      category: this.finance_form.value.category,
      edit_all_installments: this.finance_form.value.edit_all || false,
      number_of_installments: installments,
      finance_id: this.data.finance?.id
    };

    if (!this.finance_form.value.edit_all) {
      body.installment_id = this.data.finance?.installment.id;
      body.installment_value = value;
    } else {
      body.value = value || 1;
    }

    // Chama o serviço de edição da Finance
    this.financesService.patchFinance(this.data.finance?.id, body as BodyJson).subscribe({
      next: () => {
        this.chance('yes');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  setRecurrence(option: string | undefined | null){
    if(!option) return 'SINGLE';

    if(['único', 'SINGLE'].includes(option)) return 'SINGLE';
    else if(['semanal', 'WEEKLY'].includes(option)) return 'WEEKLY';
    else if(['mensal', 'MONTHLY'].includes(option)) return 'MONTHLY';
    else if(['anual', 'ANNUAL'].includes(option)) return 'ANNUAL';
    else if(['parcelada', 'INSTALLMENTS'].includes(option)) return 'INSTALLMENTS';
    else return 'SINGLE';
  }

  setType(option: string | undefined | null){
    if(option === 'receita') return 'INCOME';
    else if(option === 'despesa') return 'EXPENDITURE';
    else if(option === 'transferência') return 'TRANSFER';
    else return 'INCOME';
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.finance_form.value });
  }
}
