import { Component, OnInit } from '@angular/core';
import { ScannerService, ScanResult } from '@app/scanner.service';
import { Web3Service } from '@app/web3.service';
import * as environment from '@environments/environment';
import { OnsNavigator } from 'ngx-onsenui';
import { LoginComponent } from '@app/scan-result/login/login.component';
import { AddTokenComponent } from '@app/scan-result/add-token/add-token.component';
import { TransactionComponent } from '@app/scan-result/transaction/transaction.component';

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
      address: '0x0990243CD5FDCA81c9cF9B9e1F374A8eeb3dB602',
      name: 'BadeendToken'
    };
    this.onScan(result);
  }

  debugAddVoucher() {
    const result = new ScanResult();
    result.id = 1234567890;
    result.type = 'token';
    result.body = {
      publicKey:
        // ID: "7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029"
        // Use in geth attach: shh.getPublicKey("7f1f93a7e78191f040da758cea780a0739a1d05d70937d3ca1272839e800b029");
        '0x0421744c1c5f25ef122dacb927fcbb0395f927b68d989663c0b662550b290e8f2810f8a7ba94549bbd6c05ed6de95ae85dc643ea424d0f6b4d48c19678383078f5',
      address: '0x0990243CD5FDCA81c9cF9B9e1F374A8eeb3dB602',
      owner: '0x882b251118e25BEB149b4D71DDb5074C21F6111e',
      name: 'BadeendToken'
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
    result.type = 'transaction';
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
      this._navigator.element.pushPage(AddTokenComponent, { data: { scanResult: (Object.assign(new AddTokenRequest, result)) } });
    } else if ((Object.assign(new LoginRequest, result)).isValid) {
      // Log the user in a website
      this._navigator.element.pushPage(LoginComponent, { data: { scanResult: result } });
    } else if ((Object.assign(new TransactionRequest, result)).isValid) {
      // make transaction
      this._navigator.element.pushPage(TransactionComponent, { data: { scanResult: (Object.assign(new TransactionRequest, result)) } });
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
      !!this.address && !!this.address.length &&
      !!this.name && !!this.name.length;
  }

  get isVoucher(): boolean {
    return !!this.owner && !!this.owner.length;
  }

  get name(): string {
    return this.body['name'];
  }

  get owner(): string {
    return this.body['owner'];
  }
}

export class LoginRequest extends ScanResult {
  get isValid(): boolean {
    return this.type === 'login';
  }
}

export class TransactionRequest extends ScanResult {
  get data(): string {
    return this.body['data'];
  }

  get isValid(): boolean {
    return this.type === 'transaction' &&
      !!this.to && (
        // Either send data
        !!this.data ||
        // Or send ether. Note: can do botlh
        !!this.value
      );
  }

  get to(): string {
    return this.body['to'];
  }

  get value(): string {
    return this.body['value'];
  }
}
