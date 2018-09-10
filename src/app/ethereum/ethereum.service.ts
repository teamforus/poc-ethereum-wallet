import { Keyring } from './keyring';
import { Accounts } from './accounts';
import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { environment } from '../../environments/environment';

@Injectable()
export class EthereumService {

  // @ts-ignore
  private web3: Web3;
  private keyring: Keyring;
  public accounts: Accounts;

  constructor() {
    // @ts-ignore
    this.web3 = new Web3(environment.ethNode);
    this.keyring = new Keyring();
    this.accounts = new Accounts(this.web3, this.keyring);
  }

}
