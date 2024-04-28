import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanciaPhotographyComponent } from './financia-photography.component';

const routes: Routes = [{ path: '', component: FinanciaPhotographyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciaPhotographyRoutingModule { }
