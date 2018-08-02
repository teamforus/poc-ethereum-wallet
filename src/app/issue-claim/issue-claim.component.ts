import { Key } from './../vault/key';
import { ActivatedRoute, Router } from '@angular/router';
import { Identity } from './../vault/identity';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'app-issue-claim',
  templateUrl: './issue-claim.component.html',
  styleUrls: ['./issue-claim.component.css']
})
export class IssueClaimComponent implements OnInit {
  identity: Identity;
  claimType: number;
  scheme: number;
  subjectAddress: string;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
  data = '';
  uri = '';

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.route.snapshot.paramMap.get('address'));
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
  }

  async issue() {
    const issuerContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    const subjectContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.subjectAddress,
      null
    );

    const managmentAccount = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.managementkey);

    const claimKey = this.web3Service.web3.eth.accounts.create();

    await this.vault.addKeyToIdentity(issuerContract, managmentAccount, claimKey, 3);

    const dataToSign = this.web3Service.web3.utils.soliditySha3(subjectContract.options.address, this.claimType, this.data);
    const signature = this.web3Service.web3.eth.accounts.sign(
      this.web3Service.web3.utils.utf8ToHex(dataToSign),
      claimKey.privateKey
    ).signature;

    const trx = {
      to: issuerContract.options.address,
      chainId: this.web3Service.chainId,
      gas: 3000000,
      data: issuerContract.methods.execute(
        subjectContract.options.address,
        0,
        subjectContract.methods.addClaim(
          this.claimType,
          this.scheme,
          this.identity.address,
          signature,
          this.web3Service.web3.utils.utf8ToHex(this.data),
          this.uri
        ).encodeABI()
      ).encodeABI()
    };

    await this.web3Service.sendSignedTransaction(trx, this.managementkey);
    this.router.navigate(['/identities/' + this.route.snapshot.paramMap.get('address')]);
  }

}
