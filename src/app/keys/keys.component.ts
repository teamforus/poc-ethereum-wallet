import { ImportkeyComponent } from './../importkey/importkey.component';
import { Component, OnInit } from '@angular/core';
import { VaultService } from './../vault/vault.service';
import { Key } from '../vault/key';
import { OnsNavigator } from 'ngx-onsenui';
import { NewkeyComponent } from '../newkey/newkey.component';

@Component({
  selector: 'ons-page[keys]',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  keys: Array<Key>;

  constructor(
    private vault: VaultService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.keys = this.vault.getKeys();
  }

  newKey() {
    this.navigator.element.pushPage(NewkeyComponent);
  }

  importKey() {
    this.navigator.element.pushPage(ImportkeyComponent);
  }

}
