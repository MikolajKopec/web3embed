import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OffersComponent } from './offers/offers.component';
import { authGuard } from './guards/auth.guard';
import { nonAuthGuard } from './guards/non-auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: MainViewComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'offers', component: OffersComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  }, 
  { 
    path: 'auth', 
    component: AuthComponent, 
    children: [
      { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [nonAuthGuard]
      },
      // { path: 'register', component: RegisterComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Web3embedAppRoutingModule { }