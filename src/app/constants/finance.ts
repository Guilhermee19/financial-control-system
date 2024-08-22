import { IFinance } from '../models/finance';

export const FINANCE: IFinance[] = [];

export const TAGS = [
  {
    text: 'Gasto',
    tag: 'G',
  },
  {
    text: 'Conta Fixa',
    tag: 'CF',
  },
  {
    text: 'Investimento',
    tag: 'I',
  },
  {
    text: 'Conta',
    tag: 'C',
  },
];

export const STATUS = [
  {
    text: 'Aguardando',
    status: 'WAITING',
  },
  {
    text: 'Pago',
    status: 'PAID_OUT',
  },
  {
    text: 'Atrasado',
    status: 'LATE',
  },
];
