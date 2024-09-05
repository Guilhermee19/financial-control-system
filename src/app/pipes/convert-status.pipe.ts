import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStatus',
})
export class ConvertStatusPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value === 'WAITING') return '';
    else if (value === 'PAY_TODAY') return 'pagar hoje!';
    else if (value === 'PAID') return 'pago';
    else if (value === 'SOLD') return 'atrasado';
    else return value;
  }
}
