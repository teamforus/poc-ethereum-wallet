import { ClaimStatus } from './ClaimStatus';
import { Web3Service } from './../web3.service';
import * as IdentityContractData from './../../contracts/identity.js';
import { Claim } from './Claim';
import { EventEmitter, Output } from '@angular/core';

export class IdentityClaims {

  private web3Service: Web3Service;
  private claims = new Map<string, Claim>();
  private claimValues = new Array<Claim>();

  @Output() claimsUpdated: EventEmitter<Array<Claim>> = new EventEmitter();

  constructor(identityAddress, web3Service: Web3Service) {

    this.web3Service = web3Service;

    const identityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      identityAddress,
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

        if ('ClaimRequested' === event.event) {
          const claimId = this.web3Service.web3.utils.soliditySha3(event.returnValues.issuer, event.returnValues.topic);
          if (!this.claims.has(claimId)) {
            this.claims.set(claimId, {
              id: claimId,
              requestId: event.returnValues.claimRequestId,
              status: ClaimStatus.Requested,
              topic: event.returnValues.topic,
              scheme: event.returnValues.scheme,
              issuer: event.returnValues.issuer,
              signature: event.returnValues.signature,
              data: event.returnValues.data,
              uri: event.returnValues.uri,
            });
          }
        }

        if ('ClaimAdded' === event.event) {
          if (
            this.claims.has(event.returnValues.claimId)
            &&
            this.claims.has[event.returnValues.claimId].status !== ClaimStatus.DataMismatch
          ) {

            if (!this.claimValuesMatch(
              this.claims.has[event.returnValues.claimId],
              event.returnValues.claimId,
              event.returnValues.claimRequestId,
              event.returnValues.topic,
              event.returnValues.scheme,
              event.returnValues.issuer,
              event.returnValues.signature,
              event.returnValues.data,
              event.returnValues.uri
            )) {
              this.claims.has[event.returnValues.claimId].status = ClaimStatus.DataMismatch;
            }

            this.claims[event.returnValues.claimId].status = ClaimStatus.Added;
          }
        }

        if ('ClaimRemoved' === event.event) {
          if (
            this.claims.has(event.returnValues.claimId)
            &&
            this.claims.has[event.returnValues.claimId].status !== ClaimStatus.DataMismatch
          ) {

            if (!this.claimValuesMatch(
              this.claims.has[event.returnValues.claimId],
              event.returnValues.claimId,
              event.returnValues.claimRequestId,
              event.returnValues.topic,
              event.returnValues.scheme,
              event.returnValues.issuer,
              event.returnValues.signature,
              event.returnValues.data,
              event.returnValues.uri
            )) {
              this.claims.has[event.returnValues.claimId].status = ClaimStatus.DataMismatch;
            }

            this.claims[event.returnValues.claimId].status = ClaimStatus.Removed;
          }
        }

        if ('ClaimChanged' === event.event) {
          if (
            this.claims.has(event.returnValues.claimId)
            &&
            this.claims.has[event.returnValues.claimId].status !== ClaimStatus.DataMismatch
          ) {

            if (!this.claimValuesMatch(
              this.claims.has[event.returnValues.claimId],
              event.returnValues.claimId,
              event.returnValues.claimRequestId,
              event.returnValues.topic,
              event.returnValues.scheme,
              event.returnValues.issuer,
              event.returnValues.signature,
              event.returnValues.data,
              event.returnValues.uri
            )) {
              this.claims.has[event.returnValues.claimId].status = ClaimStatus.DataMismatch;
            }

            this.claims[event.returnValues.claimId].status = ClaimStatus.Changed;
          }
        }

        this.claimValues = new Array<Claim>();
        for (const claimRequest of this.claims.values()) {
          this.claimValues.push(claimRequest);
        }
        this.claimsUpdated.emit(this.claimValues);
      }
    ); // allEvents

  } // constructor

  public getClaim(claimId) {
    return this.claims.get(claimId);
  }

  private claimValuesMatch(
    claim: Claim,
    id: number,
    requestId: number,
    topic: number,
    scheme: number,
    issuer: string,
    signature: string,
    data: string,
    uri: string
  ) {
    return (
      id === claim.id
      &&
      requestId === claim.requestId
      &&
      topic === claim.topic
      &&
      scheme === claim.scheme
      &&
      issuer === claim.issuer
      &&
      signature === claim.signature
      &&
      data === claim.data
      &&
      uri === claim.uri
    );
  }

}
