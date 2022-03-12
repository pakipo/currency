import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import {
  ICurrency,
  PreloadService
} from '../../../index';

@Component({
  selector: 'app-mainInfoCard',
  templateUrl: './main-info-card.component.html',
  styleUrls: ['./main-info-card.component.scss']
})
export class MainInfoCardComponent implements OnInit {

  constructor(
    private router: Router,
    private preloadService: PreloadService
  ) { }
  @Input('currency') currency!: ICurrency;

  ngOnInit(): void {
  }

  goToCurrencyRate() {
    this.router.navigate(['currecyRate', this.currency['Cur_Abbreviation']],
      {
        queryParams: {
          dinemics: this.currency['Dynamics'],
          scale: this.currency['Cur_Scale']
        }
      })

  }
}
