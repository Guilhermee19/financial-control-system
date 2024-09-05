import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFinance } from 'src/app/models/finance';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-card-financial',
  templateUrl: './card-financial.component.html',
  styleUrls: ['./card-financial.component.scss'],
})
export class CardFinancialComponent {
  @Input() financial!: IFinance;
  @Output() event = new EventEmitter<string>();

  constructor(private financesService: FinancesService) {}

  isSelect = false;

  modeEdit() {
    console.log(this.financial);
  }

  deletItem() {
    if (!this.financial?.id) return;

    this.financesService.deletFinance(this.financial.id).subscribe({
      next: (data) => {
        // this.getAllFinances(this.current_month);
        this.event.emit('DELET');
      },
    });
  }

  get status() {
    const hoje = new Date();
    const dataInput = new Date(this.financial.parcela.date + 'T12:00:00'); // Data sem ajuste de hora

    // Pegue as informações de ano, mês e dia
    const hojeAno = hoje.getFullYear();
    const hojeMes = hoje.getMonth();
    const hojeDia = hoje.getDate();

    const dataAno = dataInput.getFullYear();
    const dataMes = dataInput.getMonth();
    const dataDia = dataInput.getDate();

    // Se a variável is_paid for true, retorna 'PAID'
    if (this.financial.parcela.is_paid) {
      return 'PAID';
    }

    // Lógica para SOLD, WAITING, e PAY_TODAY
    if (
      dataAno < hojeAno ||
      (dataAno === hojeAno &&
        (dataMes < hojeMes || (dataMes === hojeMes && dataDia < hojeDia)))
    ) {
      return 'SOLD';
    } else if (
      dataAno > hojeAno ||
      (dataAno === hojeAno &&
        (dataMes > hojeMes || (dataMes === hojeMes && dataDia > hojeDia)))
    ) {
      return 'WAITING';
    } else {
      return 'PAY_TODAY';
    }
  }
}
