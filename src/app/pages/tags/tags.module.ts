import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MatTableModule,
    SharedModule,
    MatTooltipModule,
    MatDialogModule,
  ],
})
export class TagsModule {}
