import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private prelodService: PreloadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.prelodService.$preloaderToggle.subscribe(res => {
      this.load = res as boolean
    })
    this.banksService.getAllCurrencyNbrb()
    this.banksService.allBanksInit()
 
  }
  goToConverter() {
    this.router.navigate(['converter'])
  }
}

