import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailAccountComponent } from 'src/app/components/modals/detail-account/detail-account.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AccountComponent, DetailAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatTableModule,
    SharedModule,
    MatTooltipModule,
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatCheckboxModule,
    MatSelectModule
  ],
})
export class AccountModule {}
