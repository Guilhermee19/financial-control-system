import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { GoalsComponent } from './pages/goals/goals.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: HomeComponent },
      {
        path: 'finance',
        loadChildren: () =>
          import(
            './pages/financia-photography/financia-photography.module'
          ).then((m) => m.FinanciaPhotographyModule),
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
