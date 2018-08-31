import { Web3Service } from './../web3.service';
import { VaultService } from './../vault/vault.service';
import { Key } from './../vault/key';
import { Claim } from './../claims/Claim';
import { ClaimsService } from './../claims/claims.service';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { Component, OnInit, HostListener } from '@angular/core';
import { Identity } from '../vault/identity';
import { ClaimStatus } from '../claims/ClaimStatus';
import * as IdentityContractData from './../../contracts/identity.js';
import { environment } from '../../environments/environment';
import * as ons from 'onsenui';

enum ScreenStatus {
  Start,
  Busy,
  Done
}

@Component({
  selector: 'ons-page[claim]',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  ScreenStatus = ScreenStatus;
  screenStatus: ScreenStatus = ScreenStatus.Start;
  ClaimStatus = ClaimStatus;
  claimId: string;
  identity: Identity;
  identityClaims = null;
  claim: Claim;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';

  constructor(
    private navigator: OnsNavigator,
    private params: Params,
    private claimService: ClaimsService,
    private vault: VaultService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    this.claimId = this.params.data.claimId;
    this.identity = this.params.data.identity;
    this.identityClaims = this.claimService.getIdentityClaims(this.identity.address);
    this.claim = this.identityClaims.getClaim(this.claimId);
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
    if (this.managementkeys.length > 0) {
      this.managementkey = this.managementkeys[0].address;
    }
    this.screenStatus = ScreenStatus.Start;
  }

  @HostListener('window:show', ['$event'])
  async onShow(event) {
    if ('newidentity' === event.target.id) {
      this.ngOnInit();
      await this.web3Service.checkConnection();
    }
  }

  back() {
    this.navigator.element.popPage();
  }

  async approve() {
    this.screenStatus = ScreenStatus.Busy;
    const managmentAccount = this.vault.getKeyByAddress(this.managementkey);

    const identityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    const trx = {
      from: managmentAccount.address,
      to: identityContract.options.address,
      gas: environment.gas,
      data: identityContract.methods.approve(
        this.web3Service.web3.utils.numberToHex(this.claim.requestId),
        true
      ).encodeABI()
    };

    if (environment.chainId) {
      // @ts-ignore
      trx.chainId = environment.chainId;
    }

    await this.web3Service.sendSignedTransaction(trx, managmentAccount.key);
    ons.notification.toast('Claim approved', {timeout: 5000});
    this.navigator.element.popPage();

  }

}
