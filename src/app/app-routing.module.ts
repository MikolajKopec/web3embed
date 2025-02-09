import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaychainViewComponent} from './paychain-view/paychain-view.component';

const routes: Routes = [
  {path: '', component: PaychainViewComponent, data: {title: 'Paychain'}}
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
