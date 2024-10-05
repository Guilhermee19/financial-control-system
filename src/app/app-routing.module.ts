import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'finance',
        loadChildren: () =>
          import(
            './pages/financia-photography/financia-photography.module'
          ).then((m) => m.FinanciaPhotographyModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./pages/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./pages/report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('./pages/config/config.module').then((m) => m.ConfigModule),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
