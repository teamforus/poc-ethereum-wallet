import { Key } from './../vault/key';
import { Identity } from './../vault/identity';
import { Params, OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import { IdentityService } from '@app/identity.service';

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
    private _identityService: IdentityService,
    private params: Params,
    private navigator: OnsNavigator,
    private _vaultService: VaultService
  ) { }

  ngOnInit() {
    this.identity = this._identityService.getIdentityByAddress(this.params.data.address) as Identity;
    this.keys = this._vaultService.getKeys();
  }

  cancel() {
    this.navigator.element.popPage();
  }

  async addKey() {
    this._identityService.importIdentityKey(
      this.identity,
      this.keyAddress,
      this._vaultService.getKeyByAddress(this.keyAddress).key,
      this.purpose);

    this.navigator.element.popPage();
  }

}
