import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

@Injectable()
export class Web3Service {
  chanId = 6292;
  web3: Web3;

  constructor() {
    this.web3 = new Web3("ws://localhost:8546");
  }

}
