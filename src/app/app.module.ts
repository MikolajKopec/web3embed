import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import { WaitlistComponent } from './waitlist/waitlist.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Web3embedAppModule } from './web3embed-app/web3embed-app.module';
@NgModule({
  declarations: [
    AppComponent,
    WaitlistComponent,
    HomepageComponent,
  ],
  imports: [
    Web3embedAppModule,
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatTabGroup,
    MatTab,
    LottieComponent,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    })
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
