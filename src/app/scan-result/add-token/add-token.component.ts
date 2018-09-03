import { OnsNavigator, Params } from 'ngx-onsenui';
import { VaultService } from '@app/vault/vault.service';
import { Web3Service } from '@app/web3.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { AddTokenRequest } from '@app/scan/scan.component';
import { Token } from '@app/vault/token';
import { Voucher } from '@app/vault/voucher';
import { ScanResult } from '@app/scanner.service';

@Component({
  selector: 'ons-page[add-token]',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.css']
})
export class AddTokenComponent implements OnInit {
  private _loading = false;
  private _scanResult: AddTokenRequest;

  constructor(
    private _params: Params,
    public web3Service: Web3Service,
    private vault: VaultService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this._scanResult = this._params.data.scanResult;
  }

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if ('add-token' === event.target.id) {
      this.ngOnInit();
    }
  }

  add() {
    this._loading = true;
    if (this._scanResult.isVoucher) {
      const voucher = new Voucher();
      voucher.address = this._scanResult.address;
      voucher.from = this._scanResult.owner;
      voucher.name = this._scanResult.name;
      const success = this.vault.addVoucher(voucher);
      if (success) {
        this._loading = false;
        this.navigator.element.popPage();
      } else {
        console.error('something went wrong?');
      }
    } else {
      const token = new Token();
      token.address = this._scanResult.address;
      this.vault.addToken(token);
      this._loading = false;
      this.navigator.element.popPage();
    }
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
