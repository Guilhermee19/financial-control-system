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

  get nameTag() {
    return this.financial.tag.nome[0];
  }
}
