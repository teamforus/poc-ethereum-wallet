import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Identity } from './../vault/identity';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'ons-page[identityaddkey]',
  templateUrl: './identityaddkey.component.html',
  styleUrls: ['./identityaddkey.component.css']
})
export class IdentityaddkeyComponent implements OnInit {
  identity: Identity;
  keys: Key[] = new Array<Key>();
  managementkeys: Key[] = new Array<Key>();
  newkey = 'Generate new';
  importkey = '';
  purpose = 1;
  managementkey = '';

  constructor(
    private route: ActivatedRoute,
    private vault: VaultService,
    private web3Service: Web3Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.route.snapshot.paramMap.get('address'));
    this.keys = this.vault.getKeys();
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
  }

  async addKey() {
    let toAdd;
    if ('Import' === this.newkey) {
      toAdd = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.importkey);
    } else if ('Generate new' === this.newkey) {
      toAdd = this.web3Service.web3.eth.accounts.create();
    } else {
      toAdd = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.newkey);
    }

    const managmentAccount = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.managementkey);

    const identityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );


    await this.vault.addKeyToIdentity(identityContract, managmentAccount, toAdd, this.purpose);
    this.router.navigate(['/identities/' + this.route.snapshot.paramMap.get('address')]);

  }
}
