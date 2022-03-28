import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MainInfoComponent,
  CurrencyRateComponent,
  ConverterComponent
} from './index';

const routes: Routes = [

 
  { path: 'mainInfo', component: MainInfoComponent },
  { path: 'currecyRate/:currencyName', component: CurrencyRateComponent },
  { path: 'converter', component: ConverterComponent },
  { path: "", redirectTo: "mainInfo", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
