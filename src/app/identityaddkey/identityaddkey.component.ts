import { Key } from './../vault/key';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Identity } from './../vault/identity';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'app-identityaddkey',
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

    const IdentityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    let keyAdded = false;
    try {
      keyAdded = await this.addKeyToIdentity(IdentityContract, managmentAccount, toAdd, this.purpose);
    } catch (error) {
      console.log(error);
      keyAdded = false;
    }

    if (keyAdded) {
      this.vault.addKeyToIdentity(this.identity.address, toAdd.privateKey, this.purpose);
      this.router.navigate(['/identities/' + this.route.snapshot.paramMap.get('address')]);
    }

  }

  async addKeyToIdentity(IdentityContract, managmentAccount, toAdd, purpose) {
    /*
    IdentityContract.events.KeyAdded()
    .on('data', (event) => {
        console.log('Event:');
        console.log(event);
    })
    .on('changed', (event) => {
        console.log('Changed:');
        console.log(event);
    })
    .on('error', (error) => {
        console.log('Error:');
        console.log(error);
    });
    */

    const trx = {
      // nonce: this.vault.getNonce(),
      from: managmentAccount.address,
      to: this.identity.address,
      chainId: this.web3Service.chanId,
      gas: 2000000,
      data: IdentityContract.methods.addKey(
        toAdd.address,
        purpose,
        1
      ).encodeABI()
    };

    const receipt = await this.web3Service.web3.eth.accounts.signTransaction(trx, managmentAccount.privateKey)
    .then((sgnTrx) => {
      const trxPromise = this.web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
      /*
      trxPromise.on('transactionHash', (hash) => {
        IdentityContract.once('KeyAdded', { filter: { transactionHash: hash}}, (error, event) => {
          console.log('Once:');
          console.log(error);
          console.log(event);
        });
      });
      */
      return trxPromise;
    }).then((result) => {
      return result;
    }).catch((error) => {
      throw new Error(error);
    });

    /*
    IdentityContract.getPastEvents('KeyAdded', {
      filter: { transactionHash: receipt.transactionHash},
      fromBlock: 0,
      toBlock: 'latest'
    })
    .then((events) => {
        console.log(events);
    });
    */
    if (1 !== this.web3Service.web3.utils.hexToNumber(receipt.status)) {
      console.log(receipt);
      throw new Error('Could not add key');
    }

  }
}
