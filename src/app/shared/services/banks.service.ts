import { Injectable } from '@angular/core';

import { concatMap, map } from 'rxjs/operators';
import { from, BehaviorSubject } from 'rxjs';
import {
  ICurrency,
  IBanks,
  ApiRequestService,
  EAppCurrencyId,
  PreloadService
} from '../../index';



@Injectable({
  providedIn: 'root'
})
export class banksService {

  //внутренние id валют нбрб
  currencyId: Array<number> = [431, 451, 429, 426, 456, 449, 452, 462, 508, 448];
  $nbrbCurrencyRates = new BehaviorSubject<Array<ICurrency> | null>(null)
  nbrbCurrencyRates: ICurrency[] = [];
  $banks = new BehaviorSubject<Array<IBanks> | null>(null)
  banks: Array<IBanks> = []
  imgPath: string = '../../assets/logoBanks/'

  constructor(
    private apiService: ApiRequestService,
    private preloadService: PreloadService
  ) { }

  //курсы основных валют нбрб.
  getAllCurrencyNbrb() {

    from(this.currencyId).subscribe(id => {
      let data: ICurrency;
      this.apiService.getAllCurrencyNbrb(id).pipe(
        map(res => {
          data = res as ICurrency
          return data
        }),
        concatMap(res => {
          let endDate = new Date();
          let startDate = new Date(new Date().getTime() - (86400000))
          return this.apiService.getAllCurrencyDinamicNbrb(
            res.Cur_ID,
            `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
            `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`
          )
        })).subscribe((res) => {

          let dinArr = res as any[]
          let dinamics = dinArr[1]['Cur_OfficialRate'] - dinArr[0]['Cur_OfficialRate']
          data['Dynamics'] = dinamics
           data['AppID'] = EAppCurrencyId[data['Cur_Abbreviation'] as keyof typeof EAppCurrencyId]       
          if (data['Cur_Name'] === 'Гривен') { data['Cur_Name'] = 'Гривна'}
          if (data['Cur_Name'] === 'Российских рублей') { data['Cur_Name'] = 'Российский рубль'}
          if (data['Cur_Name'] === 'Злотых') { data['Cur_Name'] = 'Злотый'}
          if (data['Cur_Name'] === 'Китайских юаней') { data['Cur_Name'] = 'Китайский юань'}
          this.nbrbCurrencyRates.push(data)

          if (this.nbrbCurrencyRates.length === this.currencyId.length) {
            this.nbrbCurrencyRates.sort((a, b) => {
              return a['AppID']! - b['AppID']!
            })
            this.$nbrbCurrencyRates.next(this.nbrbCurrencyRates)
   
          }
        })
    },
      (err) => { }
    )
  }

  allBanksInit() {

    //БЕЛАРУСБАНК
    this.apiService.belarusBankRate().pipe(
      map(res => {
        let currency = []
        let rates = res as any[]
        rates = rates[0]
        let keys = Object.keys(rates)
        keys = keys.filter(key => {
          return ((key.includes('_in') || key.includes('_out')) && (+rates[key as keyof typeof rates]!==0))
        })
        for (let i = 0; i < keys.length;i+=2) {
          let ratesnameIn = keys[i]
          let ratesnameOut = keys[i + 1]
          if (ratesnameIn.split('_').length === 2) {
            currency.push({
              'name': ratesnameIn.split('_')[0],
              '_in': rates[ratesnameIn as keyof typeof rates],
              '_out': rates[ratesnameOut as keyof typeof rates]
            })
          } else if (ratesnameIn.split('_').length === 3) {
            currency.push({
              'name': ratesnameIn.split('_')[0] + " / " + ratesnameIn.split('_')[1],
              '_in': rates[ratesnameIn as keyof typeof rates],
              '_out': rates[ratesnameOut as keyof typeof rates]
            })
          }
        }
        this.banks.push({
          'Banks_name': 'Беларусбанк',
          'logo': this.imgPath + 'belarusbank.jpg' ,
          'Url': 'https://belarusbank.by/',
          'currency': currency
        })
      })
    ).subscribe(res => {
      this.$banks.next(this.banks)}
    )

  }
}

