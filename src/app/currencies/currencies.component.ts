import { Web3Service } from './../web3.service';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  listKeys: ListKey[] = new Array<ListKey>();

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    const keys = this.vault.getKeys();
    for (const key of keys) {
      const account = this.web3Service.web3.eth.accounts.privateKeyToAccount(key.key);
      this.listKeys.push(
        {
          address: this.web3Service.web3.eth.accounts.privateKeyToAccount(key.key).address,
          key: key.key,
          balance: this.web3Service.web3.eth.getBalance(account.address)
        }
      );
    }
  }

}


class ListKey {
  address: string;
  key: string;
  balance: number;
}
