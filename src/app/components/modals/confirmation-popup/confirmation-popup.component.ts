import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IDialogActions {
  action: 'yes' | 'no';
}

export interface IData {
  title: string,
  description: string,
  btn_cancel: string,
  btn_confirm: string
}

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
  ) {}

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance });
  }
}
