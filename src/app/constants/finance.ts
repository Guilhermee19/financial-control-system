import { IFinance } from "../models/finance";

export const FINANCE: IFinance[] = [
  {
    tag: 'G',
    date: '2031-09-05',
    description: 'Plastation 5',
    value: 3960,
    Installments: 10,
    status: 'AGUARDANDO',
    card: {name: 'Nubank', due_date: '2031-09-05', payday: '2031-09-05', flag: 'MasterCard', limit: 2000},
    payment_voucher: '',
  },
  {
    tag: 'CF',
    date: '2031-09-06',
    description: 'Manutenção do Carro',
    value: 250,
    Installments: 1,
    status: 'AGUARDANDO',
    card: null,
    payment_voucher: '',
  },
  {
    tag: 'CF',
    date: '2031-09-06',
    description: 'Estacionamento',
    value: 280,
    Installments: 1,
    status: 'AGUARDANDO',
    card: null,
    payment_voucher: '',
  },
  {
    tag: 'I',
    date: '2031-09-06',
    description: 'FGTS',
    value: 160,
    Installments: 1,
    status: 'AGUARDANDO',
    card: null,
    payment_voucher: '',
  },
  {
    tag: 'C',
    date: '2031-09-07',
    description: 'Cartão Inter',
    value: 123,
    Installments: 1,
    status: 'AGUARDANDO',
    card: {name: 'Inter', due_date: '2031-09-07', payday: '2031-09-07', flag: 'MasterCard', limit: 2000},
    payment_voucher: '',
  }
]
