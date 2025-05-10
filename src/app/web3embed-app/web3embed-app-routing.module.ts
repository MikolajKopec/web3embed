// web3embed-app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OffersComponent } from './offers/offers.component';
import { AuthGuard } from '../guards/auth.guard';
import { PublicGuard } from '../guards/public.guard';

const routes: Routes = [
  { 
    path: '', 
    component: MainViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'offers', component: OffersComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  }, 
  { 
    path: 'auth', 
    component: AuthComponent,
    canActivate: [PublicGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Web3embedAppRoutingModule { }