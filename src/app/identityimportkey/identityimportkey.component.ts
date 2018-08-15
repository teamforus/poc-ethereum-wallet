import { Key } from './../vault/key';
import { Identity } from './../vault/identity';
import { Params, OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[identityimportkey]',
  templateUrl: './identityimportkey.component.html',
  styleUrls: ['./identityimportkey.component.css']
})
export class IdentityimportkeyComponent implements OnInit {
  identity: Identity;
  keys: Key[] = new Array<Key>();
  keyAddress = '';
  purpose = 1;

  constructor(
    private vault: VaultService,
    private params: Params,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.params.data.address);
    this.keys = this.vault.getKeys();
  }

  cancel() {
    this.navigator.element.popPage();
  }

  async addKey() {
    this.identity.keys.push({
      address: this.keyAddress,
      key: this.vault.getKeyByAddress(this.keyAddress).key,
      purpose: this.purpose
    });

    this.navigator.element.popPage();
  }

}
