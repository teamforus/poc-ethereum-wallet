import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { environment } from '../environments/environment';

@Injectable()
export class Web3Service {
  chainId = null;
  // @ts-ignore
  web3: Web3;

  constructor() {
    // @ts-ignore
    this.web3 = new Web3(environment.ethNode);
    this.chainId = environment.chainId;
  }

  async sendSignedTransaction(trx: object, privateKey: string) {
    return this.web3.eth.accounts.signTransaction(trx, privateKey)
    .then((sgnTrx) => {
      return this.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
    }).then((result) => {
      return result;
    }).catch((error) => {
      throw new Error(error);
    });
  }


  async addKeyToIdentity(identityContract, managmentAccount, toAdd, purpose) {
    const trx = {
      from: managmentAccount.address,
      to: identityContract.options.address,
      chainId: this.chainId,
      gas: environment.gas,
      data: identityContract.methods.addKey(
        toAdd.address,
        purpose,
        1
      ).encodeABI()
    };

    const receipt = await this.sendSignedTransaction(trx, managmentAccount.privateKey);

    if (true !== receipt.status) {
      console.log(receipt);
      throw new Error('Could not add key');
    }


  }

}
