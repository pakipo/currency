import {
  EAppCurrencyId
} from '../../index';

export interface ICurrency {

  'Cur_ID': number,
  'Cur_Abbreviation': string,
  'Cur_Name': string,
  'Date': Date,
  'Cur_Scale': number,
  'Cur_OfficialRate': number,
  'Dynamics'?: number,
  'AppID'?: EAppCurrencyId,
 
}
