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

export interface Parcela {
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

export interface ITag {
  id: number;
  bg_color: string;
  color: string;
  nome: string;
  porcent: string;
}

export interface IFinance {
  account: number;
  account_obj: Account;
  created_at: string;
  created_by: number;
  date: string;
  description: string;
  id: number;
  is_cash: boolean;
  is_installments: boolean;
  number_of_installments: number;
  parcela: Parcela;
  tag: number;
  tag_obj: ITag;
  updated_at: string;
  updated_by: number;
  value: number;
}
