import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Key } from './../vault/key';
import { Identity } from './../vault/identity';
import { Component, OnInit } from '@angular/core';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'app-deleterecord',
  templateUrl: './deleterecord.component.html',
  styleUrls: ['./deleterecord.component.css']
})
export class DeleterecordComponent implements OnInit {
  identity: Identity;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
  recordKey = '';

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.recordKey = this.route.snapshot.paramMap.get('record');
    this.identity = this.vault.getIdentity(this.route.snapshot.paramMap.get('address'));
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
  }

  async delete() {
    const identityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    const trx = {
      from: this.web3Service.web3.eth.accounts.privateKeyToAccount(this.managementkey).address,
      to: this.identity.address,
      chainId: this.web3Service.chainId,
      gas: 10000000,
      data: identityContract.methods.unSetRecord(
        this.web3Service.web3.utils.padLeft(this.web3Service.web3.utils.utf8ToHex(this.recordKey), 32)
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.managementkey);
    this.router.navigate(['/identities/' + this.route.snapshot.paramMap.get('address')]);
  }

}
