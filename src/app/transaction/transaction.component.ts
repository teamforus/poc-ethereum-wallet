import { Web3Service } from './../web3.service';
import { ScannerService } from './../scanner.service';
import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import { Identity as VaultIdentity } from '../vault/identity';
import * as IdentityContractData from './../../contracts/identity.js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ons-page[transaction]',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  identities: VaultIdentity[];
  selectedIdentityAddress = '';
  keys: Array<Key> = new Array<Key>();
  selectedKey = ''
  transactionData = null;

  constructor(
    private vault: VaultService,
    private scanner: ScannerService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    this.identities = this.vault.getIdentities();
    if (this.identities.length > 0) {
      this.selectedIdentityAddress = this.identities[0].address;
      this.onIdentitySelect();
    }
  }

  onIdentitySelect() {
    this.keys = this.vault.getKeysByPurpose(this.selectedIdentityAddress, 2);

    this.selectedKey = '';
    if (this.keys.length > 0) {
      this.selectedKey = this.keys[0].address;
    }
  }

  scan() {
    this.scanner.scan((result) => {
      const resultObj = JSON.parse(result);
      if ('transaction' === resultObj.type) {
        this.transactionData = resultObj;
      }
    });
  }

  async send() {

    const identityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.selectedIdentityAddress,
      null
    );

    const trx = {
      to: identityContract.options.address,
      chainId: this.web3Service.chainId,
      gas: environment.gas,
      data: identityContract.methods.execute(
        this.transactionData.body.to,
        this.transactionData.body.value,
        this.transactionData.body.data
      ).encodeABI()
    };

    const receipt = await this.web3Service.sendSignedTransaction(trx, this.selectedKey);
    console.log(JSON.stringify(receipt));

  }

}
