import { Web3Service } from '@app/web3.service';
import { ScannerService } from '@app/scanner.service';
import { Key } from '@app/vault/key';
import { VaultService } from '@app/vault/vault.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Identity as VaultIdentity } from '@app/vault/identity';
import * as IdentityContractData from '@contracts/identity.js';
import { environment } from '@environments/environment';
import * as ons from 'onsenui';
import { Params, OnsNavigator } from 'ngx-onsenui';
import { TransactionRequest } from '@app/scan/scan.component';
import { HomeComponent } from '@app/home/home.component';

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
  private _identities: VaultIdentity[];
  private _scanResult: TransactionRequest;
  private _selectedAddress = '';
  private _selectedKey = '';

  constructor(
    private _navigator: OnsNavigator,
    private _params: Params,
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) { }

  ngOnInit() {
    this._identities = this._vaultService.getIdentities();
    if (this._identities.length > 0) {
      this._selectedAddress = this._identities[0].address;
      this._selectedKey = this._vaultService.getKeys()[0].address;
      this._scanResult = this._params.data.scanResult;
    }
  }

  @HostListener('window:show', ['$event'])
    onShow(event) {
      if ('transaction' === event.target.id) {
        this.ngOnInit();
    }
  }

  cancel() {
    delete this._scanResult;
    this._navigator.element.popPage();
  }

  onKeySelect(privateKey: string) {
    const key = this._vaultService.getKeyByPrivateKey(privateKey);
    this._selectedKey = key.address;
  }

  async send() {

    this.screenStatus = ScreenStatus.Busy;

    const identityContract = new this._web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this._selectedAddress,
      null
    );

    const trx = {
      to: identityContract.options.address,
      chainId: this._web3Service.chainId,
      gas: environment.gas,
      data: identityContract.methods.execute(
        this._scanResult.to,
        this._scanResult.value,
        this._scanResult.data
      ).encodeABI()
    };

    const receipt = await this._web3Service.sendSignedTransaction(trx, this._vaultService.getKeyByAddress(this._selectedKey).key);

    this._web3Service.web3.shh.post({
      pubKey: this._scanResult.shhPublicKey,
      payload: this._web3Service.web3.utils.toHex(JSON.stringify({
        'request': 'transaction',
        'id': this._scanResult.id,
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
      HomeComponent.GoToHome(this._navigator);
    } else {
      ons.notification.toast('Transaction failed', {timeout: 5000});
    }

    delete this._scanResult;
    this.screenStatus = ScreenStatus.Start;
  }

}
