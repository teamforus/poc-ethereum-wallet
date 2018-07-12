import { Web3Service } from './../web3.service';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';


enum EthBalanceType {
  Key,
  Identity
}

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  EthBalanceType = EthBalanceType;
  ethBalances: EthBalance[] = new Array<EthBalance>();

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
          type: EthBalanceType.Key
        }
      );
    }

    const identities = this.vault.getIdentities();
    for (const identity of identities) {
      this.ethBalances.push(
        {
          address: identity.address,
          balance: this.web3Service.web3.eth.getBalance(identity.address),
          type: EthBalanceType.Identity
        }
      );
    }
  }

}

class EthBalance {
  address: string;
  balance: number;
  type: EthBalanceType;
}
