import { Web3Service } from '../../web3/web3.service';
import { ScannerService } from '../../scanner/scanner.service';
import { Key } from './../../vault/key';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Identity as VaultIdentity } from './../../vault/identity';
import * as ons from 'onsenui';

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
  identities: VaultIdentity[];
  selectedIdentityAddress = '';
  keys: Array<Key> = new Array<Key>();
  selectedKey = '';
  clientdata = {};
  servicePubKey = '';
  serviceId = 0;

  constructor(
    private vault: VaultService,
    private scanner: ScannerService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {}

  @HostListener('window:show', ['$event'])
  async onShow(event) {
    if ('login' === event.target.id) {
      this.identities = this.vault.getIdentities();
      if (this.identities.length > 0) {
        this.selectedIdentityAddress = this.identities[0].address;
        this.onIdentitySelect();
      }
      this.servicePubKey = '';
      this.serviceId = 0;

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

  login() {
    this.screenStatus = ScreenStatus.Busy;

    const identityName = this.vault.getIdentity(this.selectedIdentityAddress).name;
    const key = this.vault.getKeyByAddress(this.selectedKey);

    const signData = this.web3Service.web3.utils.soliditySha3(this.selectedIdentityAddress, this.selectedKey, identityName);
    const signature = this.web3Service.web3.eth.accounts.sign(signData, key.key);

    this.web3Service.web3.shh.post({
      pubKey: this.servicePubKey,
      payload: this.web3Service.web3.utils.toHex(JSON.stringify({
        'request': 'login',
        'id': this.serviceId,
        'body': {
          'address': this.selectedIdentityAddress,
          'key': this.selectedKey,
          'name': identityName,
          'signature': signature.signature
        }
      })),
      ttl: 10,
      powTime: 10,
      powTarget: 0.5
    })
    .then(hash => {
      ons.notification.toast('Message successfuly sent', {timeout: 5000});
    })
    .catch(err => {
        ons.notification.toast('Sending message failed', {timeout: 5000});
    });

    this.servicePubKey = '';
    this.serviceId = 0;
    this.screenStatus = ScreenStatus.Start;

  }


  scan() {
    this.scanner.scan((result) => {
      const resultObj = JSON.parse(result);
      if ('login' === resultObj.type) {
        this.servicePubKey = resultObj.body.publicKey;
        this.serviceId = resultObj.id;
      }
    });
  }

}
