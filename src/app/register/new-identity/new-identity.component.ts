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
  private readonly ScreenStatus = ScreenStatus;

  managementkey = '';
  name = '';
  private _nameError = '';
  screenStatus: ScreenStatus = ScreenStatus.Start;

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

  private cancel() {
    this._navigator.element.popPage();
  }

  private canCancel(): boolean {
    return true; // this._vaultService.getIdentities().length > 1;
  }

  keySelected(key: string) {
    this.managementkey = key;
  }

  async save() {
    if (this.validateName()) {
      this.screenStatus = ScreenStatus.Busy;
      const keyPair: KeyPair = await this._web3Service.getKeyPairFromPrivateKey(this.managementkey);
      const identityAddress = await this._web3Service.createIdentity(keyPair);
      if (!!identityAddress) {
        this._vaultService.addIdentity(this.name, identityAddress, keyPair.privateKey);
        ons.notification.toast('Identity "' + this.name + '" successfuly created', { timeout: 5000 });
        this._navigator.element.popPage();
      } else {
        alert('Er is iets misgegaan.');
      }
    }
  }

  private validateName(): boolean {
    const isLengthValid = (!!this.name
      && !!this.name.length
      && this.name.length >= 3);
    if (!isLengthValid) {
      this._nameError = 'De naam moet minimaal 3 karakters hebben';
    }
    return isLengthValid;
  }

}
