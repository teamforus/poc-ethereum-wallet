import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { OnsTabbarElement } from 'onsenui';
import { IdentitiesComponent } from '@app/identities/identities.component';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from '@app/vault/vault.service';
import { Voucher } from '@app/vault/voucher';
import { Web3Service } from '@app/web3.service';
import { Identity } from '@app/vault/identity';
import { VoucherComponent } from '@app/currencies/voucher/voucher.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ons-page[vouchers]',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
  private _balances: Map<string, string> = new Map();
  private _identities: Identity[];
  private _vouchers: Observable<Voucher[]>;

  constructor(
    private _navigator: OnsNavigator,
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) { }

  ngOnInit() {
    this._identities = this._vaultService.getIdentities();
    this._vouchers = this._vaultService.getVouchers();
  }

  @HostListener('window:init', ['$event'])
  onShow(event) {
    if ('vouchers' === event.target.id) {
      this.ngOnInit();
    }
  }

  private select(voucher: Voucher) {
    this._navigator.element.pushPage(VoucherComponent, {data: { address: voucher.address }});
  }
}
