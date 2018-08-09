import { IssueClaimComponent } from './../issue-claim/issue-claim.component';
import { IdentityaddkeyComponent } from './../identityaddkey/identityaddkey.component';
import { Params, OnsNavigator } from 'ngx-onsenui';
import { Web3Service } from './../web3.service';
import { Identity } from './../vault/identity';
import { Component, OnInit } from '@angular/core';
import { VaultService } from './../vault/vault.service';
import * as IdentityContractData from './../../contracts/identity.js';

@Component({
  selector: 'ons-page[identity]',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  identity: Identity;
  balance: 0;
  allEvents = [];

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private params: Params,
    private navigator: OnsNavigator
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

    identityContract.getPastEvents(
      'allEvents',
      {fromBlock: 0, toBlock: 'latest'},
      (error, events) => {
        if (error) {
          throw new error(error);
        }
        this.allEvents = events;
      }
    );

  }

  newkey(address) {
    this.navigator.element.pushPage(IdentityaddkeyComponent, {data: {address: address}});
  }

  issueclaim(address) {
    this.navigator.element.pushPage(IssueClaimComponent, {data: {address: address}});
  }

  back() {
    this.navigator.element.popPage();
  }
}
