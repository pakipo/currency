import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  preloaderToggle: boolean = false;
  $preloaderToggle = new Subject();

  constructor() { }

  preloaderCtrl(mode: boolean) {
    this.preloaderToggle = mode;
    this.$preloaderToggle.next(this.preloaderToggle)
  }
}
