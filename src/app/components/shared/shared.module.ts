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
import { AvatarComponent } from './avatar/avatar.component';
import { InitialLettersDirective } from 'src/app/directives/initial-letters.directive';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { CalendarComponent } from './calendar/calendar.component';
import { CardFinancialComponent } from './card-financial/card-financial.component';
import { ConvertStatusPipe } from 'src/app/pipes/convert-status.pipe';
import {MatBadgeModule} from '@angular/material/badge';

const IMPORTS = [
  MatButtonModule,
  FormsModule,
  MatBadgeModule,
  ReactiveFormsModule,
  MatInputModule,
  NgxMaskDirective,
  NgxMaskPipe,
];

const DECLARATIONS = [
  LoadingComponent,
  PageLoadingComponent,
  PaginationComponent,
  ConvertMoneyPipe,
  ConvertStatusPipe,
  IconDirective,
  ThemeDarkLightComponent,
  AvatarComponent,
  InitialLettersDirective,
  CalendarComponent,
  CardFinancialComponent,
];

@NgModule({
  imports: [...IMPORTS, CommonModule, MatDialogModule, MatTooltipModule, ToastrModule.forRoot()],
  declarations: [...DECLARATIONS],
  exports: [...IMPORTS, ...DECLARATIONS],
})
export class SharedModule {}
