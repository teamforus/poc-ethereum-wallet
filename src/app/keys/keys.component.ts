import { KeyComponent } from './../key/key.component';
import { ImportKeyComponent } from '@app/register/import-key/import-key.component';
import { Component, OnInit, HostListener } from '@angular/core';
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

  ngOnInit() {}

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if ('keys' === event.target.id) {
      this.keys = this.vault.getKeys();
    }
  }

  newKey() {
    this.navigator.element.pushPage(NewkeyComponent);
  }

  importKey() {
    this.navigator.element.pushPage(ImportKeyComponent);
  }

  show(address) {
    this.navigator.element.pushPage(KeyComponent, {data: {address: address}});
  }

}
