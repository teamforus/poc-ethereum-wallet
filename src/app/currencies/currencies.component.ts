import { Key } from './../vault/key';
import { Web3Service } from './../web3.service';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import * as Erc20ContractData from './../../contracts/erc20.js';


enum BalanceType {
  Key,
  Identity
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
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    const keys = this.vault.getKeys();
    for (const key of keys) {
      const account = this.web3Service.web3.eth.accounts.privateKeyToAccount(key.key);
      this.ethBalances.push(
        {
          address: this.web3Service.web3.eth.accounts.privateKeyToAccount(key.key).address,
          balance: this.web3Service.web3.eth.getBalance(account.address),
          type: BalanceType.Key
        }
      );
    }

    const identities = this.vault.getIdentities();
    for (const identity of identities) {
      this.ethBalances.push(
        {
          address: identity.address,
          balance: this.web3Service.web3.eth.getBalance(identity.address),
          type: BalanceType.Identity
        }
      );
    }

    const tokenAddresses = this.vault.getTokens();
    for (const tokenAddress of tokenAddresses) {
      const contract = new this.web3Service.web3.eth.Contract(Erc20ContractData.abi, tokenAddress);
      const token = {
        address: tokenAddress,
        name: contract.methods.name().call(),
        symbol: '',
        balances: new Array<Balance>()
      };
      for (const key of keys) {
        token.balances.push({
          address: key.address,
          balance: contract.methods.balanceOf(key.address).call(),
          type: BalanceType.Key
        });
      }
      for (const identity of identities) {
        token.balances.push({
          address: identity.address,
          balance: contract.methods.balanceOf(identity.address).call(),
          type: BalanceType.Identity
        });
      }

      this.tokens.push(token);
    }

  }

}

class Balance {
  address: string;
  balance: number;
  type: BalanceType;
}

class Token {
  address: string;
  name: string;
  symbol: string;
  balances: Balance[];
}
