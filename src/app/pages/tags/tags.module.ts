import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailTagComponent } from 'src/app/components/modals/detail-tag/detail-tag.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxColorsModule } from 'ngx-colors';

@NgModule({
  declarations: [TagsComponent, DetailTagComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MatTableModule,
    SharedModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    NgxColorsModule
  ],
})
export class TagsModule {}
