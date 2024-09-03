export interface IAccount {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  balance_debit: string;
  balance_credit: string;
  credit_limit: string;
  credit_due_date: string;
  is_debit: boolean;
  is_credit: boolean;
  created_by: number;
  updated_by: number;
}
