import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMoney',
})
export class ConvertMoneyPipe implements PipeTransform {
  transform(money: number | null): unknown {
    if (!money) {
      return 'R$ 0,00';
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(money);
  }
}
