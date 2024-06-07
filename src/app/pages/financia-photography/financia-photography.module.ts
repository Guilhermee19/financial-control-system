import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPhotographyRoutingModule } from './financia-photography-routing.module';
import { FinanciaPhotographyComponent } from './financia-photography.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConvertStatusPipe } from 'src/app/pipes/convert-status.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailFinanceComponent } from 'src/app/components/modals/detail-finance/detail-finance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CardFinancialComponent } from 'src/app/components/card-financial/card-financial.component';
@NgModule({
  declarations: [
    FinanciaPhotographyComponent,
    ConvertStatusPipe,
    DetailFinanceComponent,
    CardFinancialComponent,
  ],
  imports: [
    CommonModule,
    FinanciaPhotographyRoutingModule,
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
