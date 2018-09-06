import { Key } from './../../vault/key';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[key]',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  key: Key = null;

  constructor(
    private vault: VaultService,
    private navigator: OnsNavigator,
    private params: Params
  ) { }

  ngOnInit() {
    this.key = this.vault.getKeyByAddress(this.params.data.address);
  }

  back() {
    this.navigator.element.popPage();
  }

}
