import { IdentityClaims } from './IdentityClaims';
import { Web3Service } from '../web3/web3.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ClaimsService {

  identityClaimsMap = new Map<string, IdentityClaims>();

  constructor(
    private web3Service: Web3Service
  ) { }

  public getIdentityClaims(identityAddress: string): IdentityClaims {
    if (!this.identityClaimsMap.has(identityAddress)) {
      this.identityClaimsMap.set(identityAddress, new IdentityClaims(identityAddress, this.web3Service));
    }
    return this.identityClaimsMap.get(identityAddress);
  }

}
