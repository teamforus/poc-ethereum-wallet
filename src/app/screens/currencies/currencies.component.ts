import { TransferAllowanceFromIdentityComponent } from './../transfer-allowance-from-identity/transfer-allowance-from-identity.component';
import { TransferTokenFromIdentityComponent } from './../transfer-token-from-identity/transfer-token-from-identity.component';
import { TransferTokenFromKeyComponent } from './../transfer-token-from-key/transfer-token-from-key.component';
import { TransferFromIdentityComponent } from './../transfer-from-identity/transfer-from-identity.component';
import { OnsNavigator } from 'ngx-onsenui';
import { AddtokenComponent } from './../addtoken/addtoken.component';
import { Web3Service } from '../../web3/web3.service';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit, HostListener } from '@angular/core';
import * as Erc20ContractData from './../../../contracts/erc20.js';
import { TransferFromKeyComponent } from './../transfer-from-key/transfer-from-key.component';

enum BalanceType {
  Key,
  Identity,
  KeyAllowance,
  IdentityAllowance
}

@Component({
  selector: 'ons-page[currencies]',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  BalanceType = BalanceType;
  ethBalances: Balance[] = new Array<Balance>();
  tokens: Token[] = new Array<Token>();

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {

  }

  @HostListener('window:show', ['$event'])
  async onShow(event) {
    if ('currencies' === event.target.id) {

      await this.web3Service.checkConnection();

      this.ethBalances.length = 0;
      this.tokens.length = 0;

      const keys = this.vault.getKeys();
      for (const key of keys) {
        const account = this.web3Service.web3.eth.accounts.privateKeyToAccount(key.key);
        this.ethBalances.push(
          {
            address: this.web3Service.web3.eth.accounts.privateKeyToAccount(key.key).address,
            balance: this.web3Service.web3.eth.getBalance(account.address),
            type: BalanceType.Key,
            spender: null,
            displayName: null
          }
        );
      }

      const identities = this.vault.getIdentities();
      for (const identity of identities) {
        this.ethBalances.push(
          {
            address: identity.address,
            balance: this.web3Service.web3.eth.getBalance(identity.address),
            type: BalanceType.Identity,
            spender: null,
            displayName: identity.name
          }
        );
      }

      const vaultTokens = this.vault.getTokens();
      for (const vaultToken of vaultTokens) {
        const contract = new this.web3Service.web3.eth.Contract(Erc20ContractData.abi, vaultToken.address);
        const token = {
          address: vaultToken.address,
          name: contract.methods.name().call(),
          symbol: '',
          balances: new Array<Balance>()
        };
        for (const key of keys) {
          token.balances.push({
            address: key.address,
            balance: contract.methods.balanceOf(key.address).call(),
            type: BalanceType.Key,
            spender: null,
            displayName: null
          });
        }
        for (const identity of identities) {
          token.balances.push({
            address: identity.address,
            balance: contract.methods.balanceOf(identity.address).call(),
            type: BalanceType.Identity,
            spender: null,
            displayName: identity.name
          });
          for (const allowanceOwnerAddress of vaultToken.allowances) {
            token.balances.push({
              address: allowanceOwnerAddress,
              balance: contract.methods.allowance(allowanceOwnerAddress, identity.address).call(),
              type: BalanceType.IdentityAllowance,
              spender: identity.address,
              displayName: identity.name
            });
          }
        }

        this.tokens.push(token);
      }
    }
  }

  transferFromKey(address) {
    this.navigator.element.pushPage(TransferFromKeyComponent, {data: {address: address}});
  }

  transferFromIdentity(address) {
    this.navigator.element.pushPage(TransferFromIdentityComponent, {data: {address: address}});
  }

  transferTokenFromKey(balanceAddress, tokenAddress) {
    this.navigator.element.pushPage(
      TransferTokenFromKeyComponent, {data: {balanceAddress: balanceAddress, tokenAddress: tokenAddress}}
    );
  }

  transferTokenFromIdentity(balanceAddress, tokenAddress) {
    this.navigator.element.pushPage(
      TransferTokenFromIdentityComponent, {data: {balanceAddress: balanceAddress, tokenAddress: tokenAddress}}
    );
  }

  transferAllowanceFromIdentity(allowanceOwnerAddress, allowanceSpenderAddress, tokenAddress) {
    this.navigator.element.pushPage(
      TransferAllowanceFromIdentityComponent,
      {data: {allowanceOwnerAddress: allowanceOwnerAddress, allowanceSpenderAddress: allowanceSpenderAddress, tokenAddress: tokenAddress}}
    );
  }

  addToken() {
    this.navigator.element.pushPage(AddtokenComponent);
  }

}

class Balance {
  address: string;
  balance: number;
  type: BalanceType;
  spender: string;
  displayName: string;
}

class Token {
  address: string;
  name: string;
  symbol: string;
  balances: Balance[];
}
