import {ICurrency} from '../../index'

export interface IBanks {
  'Banks_name': string,
  'logo': string,
  'Url': string,
  'currency': {
    'name': string,
  '_in': number,
    '_out': number
}[]
}
