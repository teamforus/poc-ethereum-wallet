import { Key } from './../vault/key';
import { async } from '@angular/core/testing';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'app-newidentity',
  templateUrl: './newidentity.component.html',
  styleUrls: ['./newidentity.component.css']
})
export class NewidentityComponent implements OnInit {
  keys: Key[] = new Array<Key>();
  name = '';
  managementkey = '';

  constructor(
    public web3Service: Web3Service,
    private vault: VaultService,
    private router: Router
  ) { }

  ngOnInit() {
    this.keys = this.vault.getKeys();
  }

  async save() {
    const keyAccount = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.managementkey);
    const identityAddress = await this.deployIdentityContract(keyAccount);
    this.vault.addIdentity(this.name, identityAddress, keyAccount.privateKey);
    this.router.navigate(['/identities']);
  }

  private async deployIdentityContract(senderAccount) {

    const IdentityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      null,
      null
    );

    const deploy = IdentityContract.deploy(
      { data: IdentityContractData.bin }
    );

    const trx = {
      // nonce: this.vault.getNonce(),
      chainId: this.web3Service.chanId,
      gas: '10000000',
      data: deploy._deployData
    };

    const contractAddress = await this.web3Service.web3.eth.accounts.signTransaction(trx, senderAccount.privateKey)
    .then((sgnTrx) => {
      return this.web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
    }).then((receipt) => {
      if (1 !== this.web3Service.web3.utils.hexToNumber(receipt.status)) {
        console.log(receipt);
        throw new Error('Could not deploy contract');
      }
      return receipt.contractAddress;
    }).catch((error) => {
      throw new Error(error);
    });

    return contractAddress;
  }

}
