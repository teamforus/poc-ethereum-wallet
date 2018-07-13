import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Erc20ContractData from './../../contracts/erc20.js';

@Component({
  selector: 'app-transfer-token-from-key',
  templateUrl: './transfer-token-from-key.component.html',
  styleUrls: ['./transfer-token-from-key.component.css']
})
export class TransferTokenFromKeyComponent implements OnInit {
  key: Key;
  balance: 0;
  tokenContract: Object;
  toAddress: string;
  toValue: number;

  constructor(
    private vault: VaultService,
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.key = this.vault.getKeyByAddress(this.route.snapshot.paramMap.get('address'));
    this.tokenContract = new this.web3Service.web3.eth.Contract(
      Erc20ContractData.abi,
      this.route.snapshot.paramMap.get('tokenaddress')
    );
    this.balance = this.tokenContract.methods.balanceOf(this.key.address).call();
  }

  async transfer() {
    const trx = {
      to: this.tokenContract.options.address,
      chainId: this.web3Service.chanId,
      gas: 3000000,
      data: this.tokenContract.methods.transfer(
        this.toAddress,
        this.toValue
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.key.key);
    this.router.navigate(['/currencies']);
  }

}
