import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

@Injectable()
export class Web3Service {
  chanId = 3177;
  // @ts-ignore
  web3: Web3;

  constructor() {
    // @ts-ignore
    this.web3 = new Web3('ws://127.0.0.1:8546');
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
      chainId: this.chanId,
      gas: 2000000,
      data: identityContract.methods.addKey(
        toAdd.address,
        purpose,
        1
      ).encodeABI()
    };

    const receipt = await this.sendSignedTransaction(trx, managmentAccount.privateKey);

    if (1 !== this.web3.utils.hexToNumber(receipt.status)) {
      console.log(receipt);
      throw new Error('Could not add key');
    }


  }

}
