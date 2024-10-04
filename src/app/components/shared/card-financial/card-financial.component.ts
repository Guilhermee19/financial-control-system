import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFinance } from 'src/app/models/finance';
import { FinancesService } from 'src/app/services/finances.service';
import { ConfirmationPopupComponent } from '../../modals/confirmation-popup/confirmation-popup.component';
import { configModals } from 'src/app/constants/utils';

@Component({
  selector: 'app-card-financial',
  templateUrl: './card-financial.component.html',
  styleUrls: ['./card-financial.component.scss'],
})
export class CardFinancialComponent {
  @Input() financial!: IFinance;
  @Input() options = true;
  @Output() event = new EventEmitter<string>();

  constructor(
    private financesService: FinancesService,
    private dialog: MatDialog
  ) {}

  isSelect = false;

  modeEdit() {
    console.log(this.financial);
  }

  deletItem() {
    if (!this.financial?.id) return;

    if(this.financial.recurrence === 'SINGLE'){
      this.popupDelete(this.financial)
    }
    else if(this.financial.recurrence === 'WEEKLY'){
      this.popupDelete(this.financial)
    }
    else if(this.financial.recurrence === 'MONTHLY'){
      this.popupDelete(this.financial)
    }
    else if(this.financial.recurrence === 'ANNUAL'){
      this.popupDelete(this.financial)
    }
    else if(this.financial.recurrence === 'INSTALLMENTS'){
      this.popupDelete(this.financial)
    }
  }

  popupDelete(finance: IFinance){
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      ...configModals,
      data: {
        title: `Deletar Tag`,
        description: `Deseja mesmo apagar ${finance.description} ?`,
        btn_cancel: `Cancelar`,
        btn_confirm: `Deletar`,
       }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.deletFinance(this.financial)
      }
    });
  }

  deletFinance(finance: IFinance){
    this.financesService.deletFinance(finance.id).subscribe({
      next: () => {
        this.event.emit('DELET');
      },
    });
  }

  get status() {
    const hoje = new Date();
    const dataInput = new Date(this.financial.installment.date + 'T12:00:00'); // Data sem ajuste de hora

    // Pegue as informações de ano, mês e dia
    const hojeAno = hoje.getFullYear();
    const hojeMes = hoje.getMonth();
    const hojeDia = hoje.getDate();

    const dataAno = dataInput.getFullYear();
    const dataMes = dataInput.getMonth();
    const dataDia = dataInput.getDate();

    // Se a variável is_paid for true, retorna 'PAID'
    if (this.financial.installment.is_paid) {
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
