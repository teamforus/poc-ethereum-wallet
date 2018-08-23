import { Claim } from './../claims/Claim';
import { ClaimsService } from './../claims/claims.service';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { Component, OnInit } from '@angular/core';
import { Identity } from '../vault/identity';
import { ClaimStatus } from '../claims/ClaimStatus';

@Component({
  selector: 'ons-page[claim]',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  ClaimStatus = ClaimStatus;
  claimId: string;
  identity: Identity;
  identityClaims = null;
  claim: Claim;

  constructor(
    private navigator: OnsNavigator,
    private params: Params,
    private claimService: ClaimsService
  ) { }

  ngOnInit() {
    this.claimId = this.params.data.claimId;
    this.identity = this.params.data.identity;
    this.identityClaims = this.claimService.getIdentityClaims(this.identity.address);
    this.claim = this.identityClaims.getClaim(this.claimId);
  }

  back() {
    this.navigator.element.popPage();
  }

  approve() {

  }

}
