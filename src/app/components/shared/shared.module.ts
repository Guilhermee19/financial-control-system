import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConvertMoneyPipe } from 'src/app/pipes/convert-money.pipe';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { IconDirective } from 'src/app/directives/icon.directive';
import { ThemeDarkLightComponent } from './theme-dark-light/theme-dark-light.component';

const IMPORTS = [
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
];

const DECLARATIONS = [
  LoadingComponent,
  PageLoadingComponent,
  PaginationComponent,
  ConvertMoneyPipe,
  IconDirective,
  ThemeDarkLightComponent
];

@NgModule({
  imports: [
    ...IMPORTS,
    CommonModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  declarations: [...DECLARATIONS],
  exports: [...IMPORTS, ...DECLARATIONS],
})
export class SharedModule {}
