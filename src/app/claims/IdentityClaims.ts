import { ClaimStatus } from './ClaimStatus';
import { Web3Service } from '../web3/web3.service';
import * as IdentityContractData from './../../contracts/identity.js';
import { Claim } from './Claim';
import { EventEmitter, Output } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

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

          const signData = this.web3Service.web3.utils.soliditySha3(
            identityContract.options.address,
            event.returnValues.topic,
            event.returnValues.data
          );
          const recoveredKey = this.web3Service.web3.eth.accounts.recover(signData, event.returnValues.signature);

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
              validSignature: this.issuerHasKey(event.returnValues.issuer, recoveredKey)
            });
          }
        }

        if (event.returnValues.claimId
            &&
            this.claims.has(event.returnValues.claimId)
            &&
            this.claims.get(event.returnValues.claimId).status !== ClaimStatus.DataMismatch) {

          const claim = this.claims.get(event.returnValues.claimId);

          if (!this.claimValuesMatch(
            claim,
            event.returnValues.claimId,
            event.returnValues.topic,
            event.returnValues.scheme,
            event.returnValues.issuer,
            event.returnValues.signature,
            event.returnValues.data,
            event.returnValues.uri
          )) {
            console.log('claimValues don\'t match');
            claim.status = ClaimStatus.DataMismatch;
          }

          if ('ClaimAdded' === event.event && claim.status !== ClaimStatus.DataMismatch) {

            // console.log('ClaimAdded');

            claim.status = ClaimStatus.Added;
          }

          if ('ClaimRemoved' === event.event && claim.status !== ClaimStatus.DataMismatch) {

            // console.log('ClaimRemoved');

            claim.status = ClaimStatus.Removed;
          }

          if ('ClaimChanged' === event.event && claim.status !== ClaimStatus.DataMismatch) {

              // console.log('ClaimChanged');

              claim.status = ClaimStatus.Changed;
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

  private issuerHasKey(issuerAddress: string, key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const issuerContract = new this.web3Service.web3.eth.Contract(
        IdentityContractData.abi,
        issuerAddress,
        null
      );

      const paddedRecoveredKey = this.web3Service.web3.utils.padLeft(key, 64);
      issuerContract.methods.getKey(paddedRecoveredKey).call().then(issuerKeyData => {
        const validKey = (
          issuerKeyData.key.toUpperCase() === paddedRecoveredKey.toUpperCase()
          &&
          issuerKeyData.keyType === '1'
          &&
          issuerKeyData.purposes.includes('3')
        );
        resolve(validKey);
      });
    });
  }

  public getClaim(claimId) {
    return this.claims.get(claimId);
  }

  private claimValuesMatch(
    claim: Claim,
    id: number,
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
