import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {PaychainViewComponent} from './paychain-view/paychain-view.component';
import {NgxNeonUnderlineComponent} from '@omnedia/ngx-neon-underline';
import {NgxTimelineComponent} from '@omnedia/ngx-timeline';
import {TimelineComponent} from './utils/timeline/timeline.component';
import {HeroTextComponent} from './utils/hero-text/hero-text.component';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatTab, MatTabGroup} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaychainViewComponent,
    TimelineComponent,
    HeroTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    NgxNeonUnderlineComponent,
    NgxTimelineComponent,
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
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
