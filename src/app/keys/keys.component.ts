import { Component, OnInit } from '@angular/core';
import { VaultService } from './../vault/vault.service';
import { Key } from '../vault/key';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  keys: Array<Key>;

  constructor(
    private vault: VaultService,
  ) { }

  ngOnInit() {
    this.keys = this.vault.getKeys();
  }

}
