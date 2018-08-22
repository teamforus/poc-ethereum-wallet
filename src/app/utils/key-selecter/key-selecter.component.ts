import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { VaultService } from '@app/vault/vault.service';
import { Key } from '@app/vault/key';

@Component({
  selector: 'app-key-selecter',
  templateUrl: './key-selecter.component.html',
  styleUrls: ['./key-selecter.component.css']
})
export class KeySelecterComponent implements OnInit {

  private _keys: Key[];
  private _key: string;
  @Output() keySelected = new EventEmitter<string>();

  constructor(
    private _vaultService: VaultService
  ) {
    this._keys = _vaultService.getKeys();
  }

  ngOnInit() {
    if (this._keys.length >= 1) {
      this.key = this._keys[0].key;
    }
  }

  @Input()
  get key(): string {
    return this._key;
  }

  set key(key: string) {
    if (!!key) {
      this._key = key;
      this.keySelected.emit(key);
    }
  }

}
