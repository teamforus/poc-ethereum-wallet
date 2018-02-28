import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import { VaultService } from './../vault/vault.service';


@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
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
          key: key.key,
          balance: this.web3Service.web3.eth.getBalance(account.address)
        }
      );
    }
  }

}

class ListKey {
  key: string;
  balance: number;
}
