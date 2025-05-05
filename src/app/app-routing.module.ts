import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { 
    path: 'app', 
    loadChildren: () => import('./web3embed-app/web3embed-app.module').then(m => m.Web3embedAppModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
