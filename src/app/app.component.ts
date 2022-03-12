import { Component, OnInit } from '@angular/core';
import {
  banksService,
  PreloadService
} from './index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'currency';
  load: boolean = false;
  constructor(
    private banksService: banksService,
  private prelodService: PreloadService
  ) { }

  ngOnInit() {
    this.prelodService.$preloaderToggle.subscribe(res => {
      this.load = res as boolean
    })
    this.banksService.getAllCurrencyNbrb()
    this.banksService.allBanksInit()
 
  }

}

