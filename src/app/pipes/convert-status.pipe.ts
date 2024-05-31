import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStatus',
})
export class ConvertStatusPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value === 'WAITING') return 'AGUARDANDO';
    else if (value === 'PAID_OUT') return 'PAGO';
    else if (value === 'LATE') return 'ATRASADO';
    else return value;
  }
}
