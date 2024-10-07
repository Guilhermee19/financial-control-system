import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, expand, map } from 'rxjs';
import { IFinance } from 'src/app/models/finance';
import { IDialogActions } from 'src/app/models/utils';
import { CompressorService } from 'src/app/services/compressor.service';
import { FinancesService } from 'src/app/services/finances.service';

export interface IData {
  finance: IFinance;
}

@Component({
  selector: 'app-finance-info',
  templateUrl: './finance-info.component.html',
  styleUrls: ['./finance-info.component.scss']
})
export class FinanceInfoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private financesService: FinancesService,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private compressor: CompressorService,
  ) {}

  finance_form = this.fb.group({
    receipt: [''],
    base64: ['']
  });

  compressed_image = [];

  ngOnInit() {
    console.log(this.data.finance);
  }

  editFinance(){
    console.log(this.data.finance);
    this.chance('edit')
  }

  deletFinance(){
    console.log(this.data.finance);
  }

  paymentInstallment(){
    console.log(this.data.finance);

    const body = {
      installment_id: this.data.finance.installment.id,
      installment_image: this.finance_form.value.base64 || ''
    }

    this.financesService.payInstallment(body).subscribe({
      next: (data) => {
        console.log(data);

        this.chance('yes')
      }
    })
  }

  uploadInstallmentImage(){
    const body = {
      installment_id: this.data.finance.installment.id,
      installment_image: this.finance_form.value.base64 || ''
    }

    this.financesService.uploadInstallmentImage(body).subscribe({
      next: (data) => {
        console.log(data);

        this.chance('yes')
      }
    })
  }

  async onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      const target = event.target.files;
      const compress = this.recursiveCompress(target[0], 0, target).pipe(
        expand((res: any) => {
          return res.index > res.array.length - 1
            ? EMPTY
            : this.recursiveCompress(target[res.index], res.index, target);
        })
      );
      compress.subscribe((res: any) => {
        if (res.index > res.array.length - 1) {
          this.finance_form.get('receipt')?.patchValue(target[0].name);
          this.finance_form.get('base64')?.patchValue(this.compressed_image[0]);

          if(this.data.finance.installment.is_paid){
            this.uploadInstallmentImage();
          }

          this.compressed_image = [];
        }
      });
    }
  }

  recursiveCompress = (image: File, index: number, array: string[]) => {
    return this.compressor.compress(image).pipe(
      map((response) => {
        this.compressed_image.push(response as never);
        return {
          data: response,
          index: index + 1,
          array,
        };
      })
    );
  };

  get status() {
    const hoje = new Date();
    const dataInput = new Date(this.data.finance.installment.date + 'T12:00:00'); // Data sem ajuste de hora

    // Pegue as informações de ano, mês e dia
    const hojeAno = hoje.getFullYear();
    const hojeMes = hoje.getMonth();
    const hojeDia = hoje.getDate();

    const dataAno = dataInput.getFullYear();
    const dataMes = dataInput.getMonth();
    const dataDia = dataInput.getDate();

    // Se a variável is_paid for true, retorna 'PAID'
    if (this.data.finance.installment.is_paid) {
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


  chance(chance: 'yes' | 'no' | 'edit'): void {
    this.dialogRef.close({ action: chance });
  }
}
