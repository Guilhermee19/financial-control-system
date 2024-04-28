import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPhotographyRoutingModule } from './financia-photography-routing.module';
import { FinanciaPhotographyComponent } from './financia-photography.component';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    FinanciaPhotographyComponent
  ],
  imports: [
    CommonModule,
    FinanciaPhotographyRoutingModule,
    MatTableModule,
    SharedModule,
    MatSelectModule
  ]
})
export class FinanciaPhotographyModule { }
