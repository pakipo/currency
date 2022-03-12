import { Component, OnInit } from '@angular/core';
import { MainInfoCardComponent, banksService, ICurrency, PreloadService } from '../../index';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {
  currencyRates!: Array<ICurrency>;

  constructor(
    private nbrbService: banksService,
    private prelodService: PreloadService,
  
  ) { }

  ngOnInit(): void {

    this.prelodService.preloaderCtrl(true)
    this.nbrbService.$nbrbCurrencyRates.subscribe(res => {
      this.currencyRates = res as ICurrency[]
      this.prelodService.preloaderCtrl(false)
    })

  
  }

 
}
