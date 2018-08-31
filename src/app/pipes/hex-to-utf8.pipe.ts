import { Pipe, PipeTransform } from '@angular/core';
import { Web3Service } from './../web3.service';

@Pipe({
  name: 'hexToUtf8'
})
export class HexToUtf8Pipe implements PipeTransform {

  constructor(
    private web3Service: Web3Service
  ) { }

  transform(value: string, args?: any): any {
    return this.web3Service.web3.utils.hexToUtf8(value);
  }

}
