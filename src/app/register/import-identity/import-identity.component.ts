import { ScannerService } from '@app/scanner.service';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from '@app/vault/vault.service';
import { Component, OnInit } from '@angular/core';
import * as environment from '@environments/environment';
import { Web3Service } from '@app/web3.service';

@Component({
  selector: 'ons-page[import-identity]',
  templateUrl: './import-identity.component.html',
  styleUrls: ['./import-identity.component.css']
})
export class ImportIdentityComponent implements OnInit {
  private _address = '';
  private _name = '';
  private _error = '';

  constructor (
    private _navigator: OnsNavigator,
    private _scannerService: ScannerService,
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) { }

  ngOnInit() {
  }

  cancel() {
    this._navigator.element.popPage();
  }

  private get hasNameError() {
    return this._error.length > 0;
  }

  scan() {
    this._scannerService.scanRaw((result) => { this._address = result; });
  }

  private get showDebug() {
    return !environment.environment.production;
  }

  importIdentity() {
    if (this._web3Service.isAddressValid(this._address)) {
      this._error = 'Het gescande adres is ongeldig';
    }
    const isLengthValid = (
      !!this._name
      && !!this._name.length
      && this._name.length >= 3);
    if (!isLengthValid) {
      this._error = 'De naam moet minimaal 3 karakters hebben';
      return;
    }
    if (this._vaultService.hasIdentityWithName(this._name)) {
      this._error = 'Er bestaat al een identiteit met deze naam';
      return;
    }
    if (this._vaultService.hasIdentityWithAddress(this._address)) {
      this._error = 'Er bestaat al een identiteit met dit adres';
      return;
    }
    this._vaultService.addIdentity(this._name, this._address);
    this._navigator.element.popPage();
  }

}
