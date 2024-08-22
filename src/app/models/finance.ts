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

export interface ITag {
  id: number;
  bg_color: string;
  color: string;
  nome: string;
  porcent: string;
}

export interface IFinance {
  id: number;
  account: Account;
  tag: ITag;
  created_at: string;
  updated_at: string;
  date: string;
  value: number;
  is_cash: boolean;
  is_installments: boolean;
  number_of_installments: number;
  description: string;
  created_by: number;
  updated_by: number;
}
