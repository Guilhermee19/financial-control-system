export type TTag = 'G' | 'CF' | 'I' | 'C';

export type TStatus = 'WAITING' | 'PAID_OUT' | 'LATE';

export interface ICard {
  due_date: string;
  payday: string;
  name: string;
  flag: string;
  limit: number;
}

export interface IFinance {
  tag: TTag;
  date: string;
  description: string;
  value: number;
  Installments: number;
  status: TStatus;
  card?: ICard | null;
  payment_voucher: string;
}
