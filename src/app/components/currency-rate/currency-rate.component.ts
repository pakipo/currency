import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {
  ICurrency,
  IBanks,
  ApiRequestService,
  EAppCurrencyId,
  PreloadService,
  banksService,
  ShadowDirective
} from '../../index';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRateComponent implements OnInit {
  banks!: Array<IBanks>;
  currencyName!: string;
  dinamics!: number;
  scale!: number;


  constructor(
    private banksService: banksService,
    private preloadService: PreloadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.preloadService.preloaderCtrl(true);
    this.currencyName = this.route.snapshot.params.currencyName;
    this.dinamics = this.route.snapshot.queryParams.dinemics;
    this.scale = this.route.snapshot.queryParams.scale;
    this.banksService.$banks.subscribe(res => {
      this.banks = res as Array<IBanks>
      if (this.banks !== null) {
        this.preloadService.preloaderCtrl(false)
      }
    }
    )
  }

  getCurrency(bank: IBanks, operator: '_in' | '_out') {
    let curr = bank.currency.find(curr => {return curr.name === this.currencyName })

    return curr ? curr[operator]: null
  }
}
