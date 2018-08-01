import { Web3Service } from './../web3.service';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import * as Erc20ContractData from './../../contracts/erc20.js';

enum BalanceType {
  Key,
  Identity
}

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
  BalanceType = BalanceType;
  vouchers: Voucher[] = new Array<Voucher>();

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    const keys = this.vault.getKeys();
    const identities = this.vault.getIdentities();

    const vouchers = this.vault.getVouchers();
    for (const voucher of vouchers) {
      const contract = new this.web3Service.web3.eth.Contract(Erc20ContractData.abi, voucher.address);
      const allowance = {
        address: voucher.address,
        sponsor: voucher.sponsor,
        name: contract.methods.name().call(),
        symbol: '',
        balances: new Array<Balance>()
      };
      for (const key of keys) {
        allowance.balances.push({
          address: key.address,
          balance: contract.methods.allowance(voucher.sponsor, key.address).call(),
          type: BalanceType.Key
        });
      }
      for (const identity of identities) {
        allowance.balances.push({
          address: identity.address,
          balance: contract.methods.allowance(voucher.sponsor, identity.address).call(),
          type: BalanceType.Identity
        });
      }

      this.vouchers.push(allowance);
    }

  }

}

class Balance {
  address: string;
  balance: number;
  type: BalanceType;
}

class Voucher {
  address: string;
  name: string;
  symbol: string;
  balances: Balance[];
}
