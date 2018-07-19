import { Pipe, PipeTransform } from '@angular/core';
import { Web3Service } from './../web3.service';

@Pipe({
  name: 'fromWei'
})
export class FromWeiPipe implements PipeTransform {

  constructor(
    private web3Service: Web3Service
  ) { }

  transform(value: string, unit: string = 'ether'): string {
    if ('string' !== typeof value) { return ''; }
    return this.web3Service.web3.utils.fromWei(String(value), unit);
  }

}
