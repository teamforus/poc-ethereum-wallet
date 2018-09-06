import { Web3Service } from '../../web3/web3.service';
import { Key } from './../../vault/key';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Params, OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[transfer-from-key]',
  templateUrl: './transfer-from-key.component.html',
  styleUrls: ['./transfer-from-key.component.css']
})
export class TransferFromKeyComponent implements OnInit {
  key: Key;
  balance: 0;
  toAddress: string;
  toValue: number;

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private params: Params,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.key = this.vault.getKeyByAddress(this.params.data.address);
    this.web3Service.web3.eth.getBalance(this.key.address).then((balance) => { this.balance = balance; });
  }

  async transfer() {
    const trx = {
      from: this.key.address,
      to: this.toAddress,
      gas: environment.gas,
      value: this.toValue
    };

    if (this.web3Service.chainId) {
      // @ts-ignore
      trx.chainId = this.web3Service.chainId;
    }

    const receipt = await this.web3Service.web3.eth.accounts.signTransaction(trx, this.key.key)
    .then((sgnTrx) => {
      return this.web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
    }).then((result) => {
      return result;
    }).catch((error) => {
      throw new Error(error);
    });

    if ('true' === receipt.status) {
      console.log(receipt);
      throw new Error('Error transferring ether');
    }

    this.navigator.element.popPage();

  }

  cancel() {
    this.navigator.element.popPage();
  }

}
