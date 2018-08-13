import { Web3Service } from './../web3.service';
import { ScannerService } from './../scanner.service';
import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import { Identity as VaultIdentity } from '../vault/identity';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  login() {
    console.log(this.selectedIdentityAddress);
    console.log(this.selectedKey);

    this.web3Service.web3.shh.post({
      pubKey: this.servicePubKey,
      payload: this.web3Service.web3.utils.toHex(JSON.stringify({
        'request': 'login',
        'id': this.serviceId,
        'body': {
          'address': this.selectedIdentityAddress,
          'key': this.selectedKey,
          'name': 'Public Key'
        }
      })),
      ttl: 10,
      powTime: 10,
      powTarget: 0.5
    })
    .then(h => {
        console.log('Message with hash ${h} was successfuly sent');
    })
    .catch(err => {
        console.log('Error: ', err);
    });

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
