import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { InputNumberDirective } from './directives/input-number.directive';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputFileDirective } from './directives/input-file.directive';
import { LoginComponent } from './pages/login/login.component';
import { ButtonActionComponent } from './components/button-action/button-action.component';
import { SharedModule } from './components/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopupComponent } from './components/modals/confirmation-popup/confirmation-popup.component';
import { PreviewDashboardComponent } from './components/modals/preview-dashboard/preview-dashboard.component';
import { FinanceInfoComponent } from './components/modals/finance-info/finance-info.component';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    InputFileDirective,
    NavbarComponent,
    InputNumberDirective,
    LoginComponent,
    ButtonActionComponent,
    ConfirmationPopupComponent,
    PreviewDashboardComponent,
    FinanceInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
