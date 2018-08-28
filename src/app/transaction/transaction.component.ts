import { Web3Service } from './../web3.service';
import { ScannerService } from './../scanner.service';
import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Identity as VaultIdentity } from '../vault/identity';
import * as IdentityContractData from './../../contracts/identity.js';
import { environment } from '../../environments/environment';
import * as ons from 'onsenui';

enum ScreenStatus {
  Start,
  Busy,
  Done
}

@Component({
  selector: 'ons-page[transaction]',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  ScreenStatus = ScreenStatus;
  screenStatus: ScreenStatus = ScreenStatus.Start;
  identities: VaultIdentity[];
  selectedIdentityAddress = '';
  keys: Array<Key> = new Array<Key>();
  selectedKey = '';
  transactionData = null;

  constructor(
    private vault: VaultService,
    private scanner: ScannerService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {}

  @HostListener('window:show', ['$event'])
    async onShow(event) {
      if ('transaction' === event.target.id) {
      this.identities = this.vault.getIdentities();
      if (this.identities.length > 0) {
        this.selectedIdentityAddress = this.identities[0].address;
        this.transactionData = null;
        this.onIdentitySelect();
      }

      await this.web3Service.checkConnection();
    }
  }

  onIdentitySelect() {
    this.keys = this.vault.getKeysByPurpose(this.selectedIdentityAddress, 1);

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
        if (this.identities.length > 0 && this.transactionData.body.from) {
          this.identities.forEach(identity => {
            if (identity.address === this.transactionData.body.from) {
              this.selectedIdentityAddress = identity.address;
              this.onIdentitySelect();
            }
          });
        }
      }
    });
  }

  async send() {

    this.screenStatus = ScreenStatus.Busy;

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

    const receipt = await this.web3Service.sendSignedTransaction(trx, this.vault.getKeyByAddress(this.selectedKey).key);

    this.web3Service.web3.shh.post({
      pubKey: this.transactionData.body.publicKey,
      payload: this.web3Service.web3.utils.toHex(JSON.stringify({
        'request': 'transaction',
        'id': this.transactionData.id,
        'body': {
          'success': receipt.status,
          'message': ''
        }
      })),
      ttl: 10,
      powTime: 10,
      powTarget: 0.5
    })
    .then(hash => {
        console.log('Message with hash ' + hash + ' was successfuly sent');
    })
    .catch(err => {
        console.log('Error: ', err);
    });

    if (true === receipt.status) {
      ons.notification.toast('Transaction was successful', {timeout: 5000});
    } else {
      ons.notification.toast('Transaction failed', {timeout: 5000});
    }

    this.transactionData = null;
    this.screenStatus = ScreenStatus.Start;
  }

}
