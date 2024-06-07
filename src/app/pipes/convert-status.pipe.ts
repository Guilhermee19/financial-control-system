import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStatus',
})
export class ConvertStatusPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value === 'WAITING') return 'não pago';
    else if (value === 'PAID_OUT') return 'pago';
    else if (value === 'LATE') return 'atrasado';
    else return value;
  }
}
