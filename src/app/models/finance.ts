import { ICategory } from "./category";

export interface Account {
  id: number;
  name: string;
  balance_debit: string;
  balance_credit: string;
  credit_limit: string;
  credit_due_date: string;
  is_debit: boolean;
  is_credit: boolean;
}

export interface Installment {
  created_at: string;
  created_by: number;
  current_installment: number;
  date: string;
  finance: number;
  id: number;
  installment_value: number;
  is_paid: boolean;
  updated_at: string;
  updated_by: number;
}

export interface IFinance {
  account: number;
  account_obj?: Account;
  created_at: string;
  created_by: number;
  date: string;
  description: string;
  id: number;
  number_of_installments: number;
  installment: Installment;
  category: number;
  category_obj?: ICategory;
  updated_at: string;
  updated_by: number;
  value: number;
  type: 'INCOME' | 'EXPENDITURE' | 'TRANSFER'
  recurrence: 'SINGLE' | 'WEEKLY' | 'MONTHLY' | 'ANNUAL' | 'INSTALLMENTS'
}
