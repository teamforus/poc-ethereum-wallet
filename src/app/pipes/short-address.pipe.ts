import { Address } from './../ethereum/types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortAddress'
})
export class ShortAddressPipe implements PipeTransform {

  transform(address: Address): any {
    return  address.slice(0, 6) + '...' + address.slice(address.length - 4, address.length);
  }

}
