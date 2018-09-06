import { Key } from './../../vault/key';
import { VaultService } from './../../vault/vault.service';
import { Web3Service } from './../../web3.service';
import { Component, OnInit } from '@angular/core';
import * as Erc20ContractData from './../../../contracts/erc20.js';
import { environment } from './../../../environments/environment';
import { Params, OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[transfer-token-from-key]',
  templateUrl: './transfer-token-from-key.component.html',
  styleUrls: ['./transfer-token-from-key.component.css']
})
export class TransferTokenFromKeyComponent implements OnInit {
  key: Key;
  balance: 0;
  tokenContract: Object;
  toAddress: string;
  toValue: number;

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private params: Params,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.key = this.vault.getKeyByAddress(this.params.data.balanceAddress);
    this.tokenContract = new this.web3Service.web3.eth.Contract(
      Erc20ContractData.abi,
      this.params.data.tokenAddress
    );
    // @ts-ignore
    this.balance = this.tokenContract.methods.balanceOf(this.key.balanceAddress).call();
  }

  async transfer() {
    const trx = {
      // @ts-ignore
      to: this.tokenContract.options.address,
      gas: environment.gas,
      // @ts-ignore
      data: this.tokenContract.methods.transfer(
        this.toAddress,
        this.toValue
      ).encodeABI()
    };

    if (this.web3Service.chainId) {
      // @ts-ignore
      trx.chainId = this.web3Service.chainId;
    }

    await this.web3Service.sendSignedTransaction(trx, this.key.key);
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }
}
