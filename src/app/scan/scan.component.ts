import { Component, OnInit } from '@angular/core';
import { ScannerService, ScanResult } from '@app/scanner.service';
import { Web3Service } from '@app/web3.service';
import * as environment from '@environments/environment';
import { OnsNavigator } from 'ngx-onsenui';
import { LoginComponent } from '@app/scan-result/login/login.component';

@Component({
  selector: 'ons-page[scan]',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  constructor(
    private _navigator: OnsNavigator,
    private _scanner: ScannerService
  ) { }

  ngOnInit() {
  }

  debugAddToken() {
    const result = new ScanResult();
    result.id = 1234567890;
    result.type = 'token';
    result.body = {
      publicKey:
      // ID: "7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029"
      // Use in geth attach: shh.getPublicKey("7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029");
      '0x0421744c1c5f25ef122dacb927fcbb0395f927b68d989663c0b662550b290e8f2810f8a7ba94549bbd6c05ed6de95ae85dc643ea424d0f6b4d48c19678383078f5',
      address: '0xb8918494b24862b2b9dc7cc2c3e9a41893d8d4b6',
      name: 'Geen Token'
    };
    this.onScan(result);
  }

  debugLogin() {
    const result = new ScanResult();
    result.id = 1234567890;
    result.type = 'login';
    result.body = {
      publicKey:
      // ID: "7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029"
      // Use in geth attach: shh.getPublicKey("7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029");
      '0x0421744c1c5f25ef122dacb927fcbb0395f927b68d989663c0b662550b290e8f2810f8a7ba94549bbd6c05ed6de95ae85dc643ea424d0f6b4d48c19678383078f5'
    };
    this.onScan(result);

  }

  debugTransaction() {
    const result = new ScanResult();
    result.id = 1234567890;
    result.type = 'token';
    result.body = {
      publicKey:
      // ID: "7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029"
      // Use in geth attach: shh.getPublicKey("7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029");
      '0x0421744c1c5f25ef122dacb927fcbb0395f927b68d989663c0b662550b290e8f2810f8a7ba94549bbd6c05ed6de95ae85dc643ea424d0f6b4d48c19678383078f5',
      to: '0xb8918494b24862b2b9dc7cc2c3e9a41893d8d4b6',
      value: '0x0',
      data: '0x00000000000000000000000000000000000000000000000000000000000000000000000'
    };
    this.onScan(result);

  }

  onScan(result: ScanResult) {
    if ((Object.assign(new AddTokenRequest, result)).isValid) {
// add token to identity
    } else if ((Object.assign(new LoginRequest, result)).isValid) {
      // Log the user in a website
      this._navigator.element.pushPage(LoginComponent, {data: { scanResult: result }});
    } else if ((Object.assign(new TransactionRequest, result)).isValid) {
// make transaction
    }
  }

  scan() {
    this._scanner.scan(this.onScan.bind(this));
  }

  private get showDebug(): boolean {
    return !environment.environment.production;
  }
}

export class AddTokenRequest extends ScanResult {
  get address(): string {
    return this.body['address'];
  }

  get isValid(): boolean {
    return this.type === 'token' &&
    !!this.name && !!this.name.length &&
    !!this.address && !!this.address.length;
  }

  get name(): string {
    return this.body['name'];
  }
}

export class LoginRequest extends ScanResult {
  get isValid(): boolean {
    return this.type === 'login';
  }
}

export class TransactionRequest extends ScanResult {
  get isValid(): boolean {
    return this.type === 'transaction' &&
      !!this.body['to'] && (
        // Either send data
        !!this.body['data'] ||
        // Or send ether. Note: can do both
        !!this.body['value']
      );
  }
}
