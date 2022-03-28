import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  NBRBPath: string = 'https://www.nbrb.by/api/exrates';
  startDate!: string
  endDate!: string
  constructor(
    private http: HttpClient,
  ) { }

  getAllCurrencyNbrb(id: number) {
    return this.http.get(this.NBRBPath + `/rates/${id}`)
  }

  //динамика курса за указунный период
  getAllCurrencyDinamicNbrb(id: number, startDate: string, endDate: string) {
  
    return this.http.get(this.NBRBPath + `/rates/dynamics/${id}?startDate=${startDate}&endDate=${endDate}`)
  }
  // курсы баларусбанк
  belarusBankRate() {
  return  this.http.get('https://belarusbank.by/api/kursExchange')
  }
    // курсы альфабанк
  alfaBankRate() {

    return this.http.get('https://developerhub.alfabank.by:8273/partner/1.0.1/public/rates')
  }
}

