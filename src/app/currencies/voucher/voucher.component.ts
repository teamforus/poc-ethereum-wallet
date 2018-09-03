import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { VaultService } from '@app/vault/vault.service';
import { Web3Service } from '@app/web3.service';
import { Voucher } from '@app/vault/voucher';
import { Identity } from '@app/vault/identity';
import { Observable } from 'rxjs/Observable';
import { IdentityService } from '@app/identity.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ons-page[voucher]',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit, OnDestroy {
  private _balances: Map<string, string> = new Map();
  private _identities: Observable<Identity[]>;
  private _identitySubscription: Subscription;
  private _name: string;
  private _voucher: Voucher;

  constructor(
    private _identityService: IdentityService,
    private _navigator: OnsNavigator,
    private _params: Params,
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) { }

  private handleNotFound() {
    this._navigator.element.popPage();
  }

  ngOnDestroy() {
    if (!!this._identitySubscription && !!this._identitySubscription.unsubscribe) {
      this._identitySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    const address = this._params.data['address'];
    if (!address) {
      this.handleNotFound();
    }
    const voucher = this._vaultService.getVoucherByAddress(address);
    if (!voucher) {
      this.handleNotFound();
    }
    this._identities = this._identityService.getIdentities();
    this._voucher = voucher as Voucher;
    // todo this should be neater
    this._identitySubscription = this._identities.subscribe((identities) => {
      identities.forEach(async identity => {
        const balance = await this._web3Service.getErc20AllowanceFrom(
          this._voucher.from,
          this._voucher.address,
          identity.address
        );
        this._balances.set(identity.address, balance);
      });
    });
  }

  @HostListener('window:init', ['$event'])
  onShow(event) {
    if ('voucher' === event.target.id) {
      this.ngOnInit();
    }
  }




}
