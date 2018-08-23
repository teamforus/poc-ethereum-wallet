import { Key } from './../vault/key';
import { Web3Service } from './../web3.service';
import { VaultService } from './../vault/vault.service';
import { Identity } from './../vault/identity';
import { Component, OnInit } from '@angular/core';
import * as IdentityContractData from './../../contracts/identity.js';
import { environment } from '../../environments/environment';
import { Params, OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[transfer-from-identity]',
  templateUrl: './transfer-from-identity.component.html',
  styleUrls: ['./transfer-from-identity.component.css']
})
export class TransferFromIdentityComponent implements OnInit {
  identity: Identity;
  balance: 0;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
  toAddress: string;
  toValue: number;

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private params: Params,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.params.data.address);
    this.web3Service.web3.eth.getBalance(this.identity.address).then((balance) => { this.balance = balance; });
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
  }

  async transfer() {
    const senderContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    const trx = {
      to: senderContract.options.address,
      chainId: this.web3Service.chainId,
      gas: environment.gas,
      data: senderContract.methods.execute(
        this.toAddress,
        this.toValue,
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.managementkey);
    this.navigator.element.popPage();

  }

  cancel() {
    this.navigator.element.popPage();
  }

}
