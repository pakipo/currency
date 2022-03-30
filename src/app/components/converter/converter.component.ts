import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { banksService, IBanks } from "../../index"

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  form!: FormGroup;
  banks!: Array<IBanks>;
  currency!: { name: string, valume: number, operation:'out'|'in' }
  constructor(
    private fb: FormBuilder,
    private banksServise: banksService,
  ) { }


  ngOnInit(): void {
    this.banksServise.$banks.subscribe(res => { this.banks = res as Array<IBanks> })

    this.form = this.fb.group({
      "volume": ['1'],
      "current": ['USD'],
      "target": ['EUR']
    })
  }

  submitForm(form: FormGroup) {

    if (form.get('target')?.value === form.get('current')?.value) {
      
      return
    } else {
    
      let target = form.get('target')?.value;
      let current = form.get('current')?.value

      if (current === 'USD') {
        this.currency = {
          name: current + ' / ' + target,
          valume: form.get('valume')?.value,
          operation: 'in'
        }
      } else if (target === 'USD') {
        this.currency = {
          name: target + ' / ' + current,
          valume: form.get('valume')?.value,
          operation: 'out'
        }
        }
    }


}
}
