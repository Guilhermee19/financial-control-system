import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPhotographyRoutingModule } from './financia-photography-routing.module';
import { FinanciaPhotographyComponent } from './financia-photography.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConvertStatusPipe } from 'src/app/pipes/convert-status.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailFinanceComponent } from 'src/app/components/modals/detail-finance/detail-finance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
@NgModule({
  declarations: [
    FinanciaPhotographyComponent,
    ConvertStatusPipe,
    DetailFinanceComponent,
  ],
  imports: [
    CommonModule,
    FinanciaPhotographyRoutingModule,
    MatTableModule,
    SharedModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class FinanciaPhotographyModule {}
