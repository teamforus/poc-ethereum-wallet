import { ClaimStatus } from './../claims/ClaimStatus';
import { ClaimsService } from './../claims/claims.service';
import { ClaimComponent } from './../claim/claim.component';
import { IdentityimportkeyComponent } from './../identityimportkey/identityimportkey.component';
import { IssueClaimComponent } from './../issue-claim/issue-claim.component';
import { IdentityaddkeyComponent } from './../identityaddkey/identityaddkey.component';
import { Params, OnsNavigator } from 'ngx-onsenui';
import { Web3Service } from './../web3.service';
import { Identity } from './../vault/identity';
import { Component, OnInit } from '@angular/core';
import { VaultService } from './../vault/vault.service';
import * as IdentityContractData from './../../contracts/identity.js';
import { Claim } from '../claims/Claim';

@Component({
  selector: 'ons-page[identity]',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  ClaimStatus = ClaimStatus;
  identity: Identity;
  balance: 0;
  allEvents = [];
  identityClaims = null;
  private claims = new Array<Claim>();

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private params: Params,
    private navigator: OnsNavigator,
    private claimService: ClaimsService
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.params.data.address);

    const identityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    identityContract.events.allEvents(
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (error, event) => {
        if (error) {
          throw new error(error);
        }
        this.allEvents.push(event);
      }
    );

    this.identityClaims = this.claimService.getIdentityClaims(this.identity.address);

    this.identityClaims.claimsUpdated.subscribe(claims => {
      this.claims = claims;
    });

  }

  newkey(address) {
    this.navigator.element.pushPage(IdentityaddkeyComponent, {data: {address: address}});
  }

  importkey(address) {
    this.navigator.element.pushPage(IdentityimportkeyComponent, {data: {address: address}});
  }

  issueclaim(address) {
    this.navigator.element.pushPage(IssueClaimComponent, {data: {address: address}});
  }

  back() {
    this.navigator.element.popPage();
  }

  viewClaim(id) {
    this.navigator.element.pushPage(ClaimComponent, {data: {claimId: id, identity: this.identity}});
  }
}
