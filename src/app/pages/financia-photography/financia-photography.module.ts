import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPhotographyRoutingModule } from './financia-photography-routing.module';
import { FinanciaPhotographyComponent } from './financia-photography.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConvertStatusPipe } from 'src/app/pipes/convert-status.pipe';
@NgModule({
  declarations: [FinanciaPhotographyComponent, ConvertStatusPipe],
  imports: [
    CommonModule,
    FinanciaPhotographyRoutingModule,
    MatTableModule,
    SharedModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class FinanciaPhotographyModule {}
