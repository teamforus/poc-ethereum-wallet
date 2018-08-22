import { Component, OnInit } from '@angular/core';
import { VaultService } from '@app/vault/vault.service';
import { Web3Service } from '@app/web3.service';
import { OnsNavigator } from 'ngx-onsenui';
import { NewIdentityComponent } from '@app/register/new-identity/new-identity.component';

@Component({
  selector: 'ons-page[new_key]',
  templateUrl: './new-key.component.html',
  styleUrls: ['./new-key.component.css']
})
export class NewKeyComponent implements OnInit {

  constructor(
    private _navigator: OnsNavigator,
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) { }

  generateKey() {
    const newAccount = this._web3Service.web3.eth.accounts.create();
    this._vaultService.addKey(newAccount.privateKey);
    this._navigator.element.resetToPage(NewIdentityComponent, {animation: 'slide'});
    // this.navigator.element.popPage();
  }

  ngOnInit() {
    if (this._vaultService.hasKey) {
      alert('U heeft al een sleutel');
      this._navigator.element.pop();
    }
  }

}
