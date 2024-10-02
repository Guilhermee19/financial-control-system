import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxColorsModule } from 'ngx-colors';
import { DetailCategoryComponent } from 'src/app/components/modals/detail-category/detail-category.component';

@NgModule({
  declarations: [CategoryComponent, DetailCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatTableModule,
    SharedModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    NgxColorsModule
  ],
})
export class CategoryModule {}
