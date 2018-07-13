import { Identity } from './../vault/identity';
import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Erc20ContractData from './../../contracts/erc20.js';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'app-transfer-token-from-identity',
  templateUrl: './transfer-token-from-identity.component.html',
  styleUrls: ['./transfer-token-from-identity.component.css']
})
export class TransferTokenFromIdentityComponent implements OnInit {
  identity: Identity;
  key: Key;
  balance: 0;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
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
    this.identity = this.vault.getIdentity(this.route.snapshot.paramMap.get('address'));
    this.tokenContract = new this.web3Service.web3.eth.Contract(
      Erc20ContractData.abi,
      this.route.snapshot.paramMap.get('tokenaddress')
    );
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
    this.balance = this.tokenContract.methods.balanceOf(this.identity.address).call();
  }

  async transfer() {
    const senderContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    const trx = {
      to: senderContract.options.address,
      chainId: this.web3Service.chanId,
      gas: 3000000,
      data: senderContract.methods.execute(
        this.tokenContract.options.address,
        0,
        this.tokenContract.methods.transfer(
          this.toAddress,
          this.toValue
        ).encodeABI()
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.managementkey);
    this.router.navigate(['/currencies']);
  }

}
