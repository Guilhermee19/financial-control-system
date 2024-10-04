import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPhotographyRoutingModule } from './financia-photography-routing.module';
import { FinanciaPhotographyComponent } from './financia-photography.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailFinanceComponent } from 'src/app/components/modals/detail-finance/detail-finance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
@NgModule({
  declarations: [
    FinanciaPhotographyComponent,
    DetailFinanceComponent,
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
    MatCheckboxModule,
    MatChipsModule
  ],
})
export class FinanciaPhotographyModule {}
