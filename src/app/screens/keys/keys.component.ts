import { Account } from './../../ethereum/account';
import { EthereumService } from './../../ethereum/ethereum.service';
import { KeyComponent } from './../key/key.component';
import { ImportkeyComponent } from './../importkey/importkey.component';
import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { NewkeyComponent } from './../newkey/newkey.component';

@Component({
  selector: 'ons-page[keys]',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  private accounts: Array<Account>;

  constructor(
    private eth: EthereumService,
    private navigator: OnsNavigator
  ) { }

  async ngOnInit() {
    this.accounts = await this.eth.accounts.watch();
  }

  newKey() {
    this.navigator.element.pushPage(NewkeyComponent);
  }

  importKey() {
    this.navigator.element.pushPage(ImportkeyComponent);
  }

  show(address) {
    this.navigator.element.pushPage(KeyComponent, {data: {address: address}});
  }

}
