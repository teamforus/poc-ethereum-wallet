import { Identity } from './../vault/identity';
import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import * as Erc20ContractData from './../../contracts/erc20.js';
import * as IdentityContractData from './../../contracts/identity.js';
import { environment } from '../../environments/environment';
import { Params, OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[transfer-token-from-identity]',
  templateUrl: './transfer-token-from-identity.component.html',
  styleUrls: ['./transfer-token-from-identity.component.css']
})
export class TransferTokenFromIdentityComponent implements OnInit {
  identity: Identity;
  key: Key;
  balance: 0;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
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
    this.identity = this.vault.getIdentity(this.params.data.balanceAddress);
    this.tokenContract = new this.web3Service.web3.eth.Contract(
      Erc20ContractData.abi,
      this.params.data.tokenAddress
    );
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
    // @ts-ignore
    this.balance = this.tokenContract.methods.balanceOf(this.identity.balanceAddress).call();
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
        // @ts-ignore
        this.tokenContract.options.address,
        0,
        // @ts-ignore
        this.tokenContract.methods.transfer(
          this.toAddress,
          this.toValue
        ).encodeABI()
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.managementkey);
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
