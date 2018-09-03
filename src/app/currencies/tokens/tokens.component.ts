import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { OnsTabbarElement } from 'onsenui';
import { IdentitiesComponent } from '@app/identities/identities.component';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from '@app/vault/vault.service';
import { Token } from '@app/vault/token';
import { Identity } from '@app/vault/identity';
import { Web3Service } from '@app/web3.service';
import { IdentityService } from '@app/identity.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ons-page[tokens]',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  private _identities: Observable<Identity[]>;
  private _tokens: TokenWrapper[];

  constructor(
    private _identityService: IdentityService,
    private _navigator: OnsNavigator,
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) { }

  ngOnInit() {
    this._identities = this._identityService.getIdentities();
    this._tokens = [];
    const tokens = this._vaultService.getTokens();
    tokens.forEach(async token => {
      try {
        const tokenWrapper = new TokenWrapper(token);
        tokenWrapper.name = await this._web3Service.getErc20Name(tokenWrapper.address);
        /*this._identities.forEach(async identity => {

          const balance = await this._web3Service.getErc20BalanceOf(
            identity.address,
            tokenWrapper.address);

          tokenWrapper.balances.set(
            identity.address,
            balance);
        });
        this._tokens.push(tokenWrapper);
        */
      } catch (e) {
        console.error(e);
      }
    });
  }

  @HostListener('window:init', ['$event'])
  onShow(event) {
    if ('tokens' === event.target.id) {
      this.ngOnInit();
    }
  }

}

class TokenWrapper {
  address: string;
  balances: Map<string, string> = new Map();
  name: string;
  tokenOwner: string;

  constructor(token: Token) {
    this.address = token.address;
  }
}
