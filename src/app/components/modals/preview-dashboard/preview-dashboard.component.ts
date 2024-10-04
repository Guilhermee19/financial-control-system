import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MONTHS } from 'src/app/constants/utils';
import { IFinance } from 'src/app/models/finance';
import { IDialogActions } from 'src/app/models/utils';

export interface IData {
  finances: IFinance[];
  date: {
    day: number | undefined;
    month: number;
    year: number;
    week?: string
  }
}

@Component({
  selector: 'app-preview-dashboard',
  templateUrl: './preview-dashboard.component.html',
  styleUrls: ['./preview-dashboard.component.scss']
})
export class PreviewDashboardComponent {
  constructor(
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {}

  months = MONTHS;
  date = new Date(this.data.date.year+'-'+this.data.date.month+'-'+this.data.date.day)

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance });
  }
}
