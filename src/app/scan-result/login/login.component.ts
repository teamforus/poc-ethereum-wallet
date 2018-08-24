import { Web3Service } from '@app/web3.service';
import { ScannerService } from '@app/scanner.service';
import { Key } from '@app/vault/key';
import { VaultService } from '@app/vault/vault.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Identity as VaultIdentity } from '@app/vault/identity';
import * as ons from 'onsenui';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { LoginRequest } from '@app/scan/scan.component';
import { HomeComponent } from '@app/home/home.component';

enum ScreenStatus {
  Start,
  Busy,
  Done
}

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ScreenStatus = ScreenStatus;
  screenStatus: ScreenStatus = ScreenStatus.Start;
  private _identities: VaultIdentity[];
  private _keyAddress: string;
  private _loginRequest: LoginRequest;
  private _selectedIdentity: VaultIdentity;

  constructor(
    private _navigator: OnsNavigator,
    private _params: Params,
    private _vault: VaultService,
    private _web3Service: Web3Service
  ) { }

  ngOnInit() { }

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if ('login' === event.target.id) {
      this._identities = this._vault.getIdentities();
      this._selectedIdentity = this._identities[0];
      this._keyAddress = this._vault.getKeys()[0].address;
      this._loginRequest = this._params.data.scanResult;
    }
  }

  cancel() {
    this._navigator.element.popPage();
  }

  login() {
    this.screenStatus = ScreenStatus.Busy;

    this._web3Service.web3.shh.post({
      pubKey: this._loginRequest.shhPublicKey,
      payload: this._web3Service.web3.utils.toHex(JSON.stringify({
        'request': this._loginRequest.type,
        'id': this._loginRequest.id,
        'body': {
          'address': this._selectedIdentity.address,
          'key': this._keyAddress,
          'name': this._selectedIdentity.name
        }
      })),
      ttl: 10,
      powTime: 10,
      powTarget: 0.5
    })
      .then(hash => {
        ons.notification.toast('Message successfuly sent', { timeout: 5000 });
        HomeComponent.GoToHome(this._navigator);
      })
      .catch(err => {
        ons.notification.toast('Sending message failed', { timeout: 5000 });
        this.screenStatus = ScreenStatus.Start;
      });
  }

  onKeySelect(privateKey: string) {
    const key = this._vault.getKeyByPrivateKey(privateKey);
    this._keyAddress = key.address;
  }
}
