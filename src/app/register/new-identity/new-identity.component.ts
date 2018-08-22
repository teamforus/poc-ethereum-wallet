import { OnsNavigator } from 'ngx-onsenui';
import { Key } from '@app/vault/key';
import { VaultService } from '@app/vault/vault.service';
import { Web3Service, KeyPair } from '@app/web3.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from '@environments/environment';
import * as ons from 'onsenui';

enum ScreenStatus {
  Start,
  Busy,
  Done
}

@Component({
  selector: 'ons-page[new-identity]',
  templateUrl: './new-identity.component.html',
  styleUrls: ['./new-identity.component.css']
})
export class NewIdentityComponent implements OnInit {
  ScreenStatus = ScreenStatus;
  screenStatus: ScreenStatus = ScreenStatus.Start;
  name = '';
  managementkey = '';

  constructor(
    public _web3Service: Web3Service,
    private _vaultService: VaultService,
    private _navigator: OnsNavigator
  ) { }



  ngOnInit() {
    this.name = '';
    this.screenStatus = ScreenStatus.Start;
  }

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if ('new-identity' === event.target.id) {
      this.ngOnInit();
    }
  }

  private canCancel(): boolean {
    return this._vaultService.getIdentities().length > 1;
  }

  keySelected(key: string) {
    this.managementkey = key;
  }

  async save() {
    this.screenStatus = ScreenStatus.Busy;
    const keyPair: KeyPair = await this._web3Service.getKeyPairFromPrivateKey(this.managementkey);
    const identityAddress = await this.deployIdentityContract(keyPair);
    this._vaultService.addIdentity(this.name, identityAddress, keyPair.privateKey);
    ons.notification.toast('Identity "' + this.name + '" successfuly created', { timeout: 5000 });
    this._navigator.element.popPage();
  }

  private async deployIdentityContract(senderKeyPair: KeyPair) {
    const trx = this._web3Service.getCreateIdentityTransaction(senderKeyPair.address);
    if (await this._web3Service.estimateTransactionSuccess(trx)) {
      const contractAddress = await this._web3Service.web3.eth.accounts.signTransaction(trx, senderKeyPair.privateKey)
        .then((sgnTrx) => {
          return this._web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
        }).then((receipt) => {
          if ('true' === receipt.status) {
            console.log(receipt);
            throw new Error('Could not deploy contract');
          }
          return receipt.contractAddress;
        }).catch((error) => {
          throw new Error(error);
        });

      return contractAddress;
    }
  }

}
