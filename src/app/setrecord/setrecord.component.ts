import { VaultService } from './../vault/vault.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Web3Service } from './../web3.service';
import { Key } from './../vault/key';
import { Identity } from './../vault/identity';
import { Component, OnInit } from '@angular/core';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'app-setrecord',
  templateUrl: './setrecord.component.html',
  styleUrls: ['./setrecord.component.css']
})
export class SetrecordComponent implements OnInit {
  identity: Identity;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
  recordKey = '';
  recordValue = '';
  editMode = false;

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const recordParam = this.route.snapshot.paramMap.get('record');
    if (recordParam) {
      this.recordKey = recordParam;
      this.editMode = true;

      const identityContract = new this.web3Service.web3.eth.Contract(
        IdentityContractData.abi,
        this.route.snapshot.paramMap.get('address'),
        null
      );
      identityContract.methods.getRecord(
        this.web3Service.web3.utils.padLeft(
          this.web3Service.web3.utils.utf8ToHex(this.recordKey), 32)
      ).call().then(value => {
        this.recordValue = value;
      });
    }
    this.identity = this.vault.getIdentity(this.route.snapshot.paramMap.get('address'));
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
  }

  async save() {
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
      data: identityContract.methods.setRecord(
        this.web3Service.web3.utils.padLeft(this.web3Service.web3.utils.utf8ToHex(this.recordKey), 32),
        this.recordValue
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.managementkey);
    this.router.navigate(['/identities/' + this.route.snapshot.paramMap.get('address')]);
  }

}
