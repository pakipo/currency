import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  MainInfoComponent,
  MainInfoCardComponent,
  banksService,
  ApiRequestService,
  CurrencyRateComponent,
  PreloaderComponent,
  PreloadService,
  ConverterComponent
} from './index';
import { ShadowDirective } from './shared/directive/shadow.directive';





@NgModule({
  declarations: [
    AppComponent,
    MainInfoComponent,
    MainInfoCardComponent,
    CurrencyRateComponent,
    PreloaderComponent,
    ShadowDirective,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [banksService, ApiRequestService, PreloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
