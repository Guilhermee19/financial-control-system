import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPhotographyRoutingModule } from './financia-photography-routing.module';
import { FinanciaPhotographyComponent } from './financia-photography.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
@NgModule({
  declarations: [
    FinanciaPhotographyComponent,
  ],
  imports: [
    CommonModule,
    FinanciaPhotographyRoutingModule,
    SharedModule,
    MatTooltipModule,
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class FinanciaPhotographyModule {}
