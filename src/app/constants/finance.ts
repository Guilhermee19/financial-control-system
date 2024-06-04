import { IFinance } from '../models/finance';

export const FINANCE: IFinance[] = [
  {
    tag: 'G',
    date: '2031-09-05',
    description: 'Plastation 5',
    value: 3960,
    installments: 10,
    current_installment: 10,
    status: 'WAITING',
    card: {
      name: 'Nubank',
      due_date: '2031-09-05',
      payday: '2031-09-05',
      flag: 'MasterCard',
      limit: 2000,
    },
    payment_voucher: '',
  },
  {
    tag: 'CF',
    date: '2031-09-06',
    description: 'Manutenção do Carro',
    value: 150,
    installments: 1,
    current_installment: 1,
    status: 'WAITING',
    card: null,
    payment_voucher: '',
  },
  {
    tag: 'CF',
    date: '2031-09-06',
    description: 'Estacionamento',
    value: 280,
    installments: 1,
    current_installment: 1,
    status: 'WAITING',
    card: null,
    payment_voucher: '',
  },
  {
    tag: 'I',
    date: '2031-09-06',
    description: 'FGTS',
    value: 160,
    installments: 1,
    current_installment: 1,
    status: 'WAITING',
    card: null,
    payment_voucher: '',
  },
  {
    tag: 'C',
    date: '2031-09-07',
    description: 'Cartão Inter',
    value: 1230,
    installments: 1,
    current_installment: 1,
    status: 'WAITING',
    card: {
      name: 'Inter',
      due_date: '2031-09-07',
      payday: '2031-09-07',
      flag: 'MasterCard',
      limit: 2000,
    },
    payment_voucher: '',
  },
];

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
