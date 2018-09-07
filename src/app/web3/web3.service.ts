import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { environment } from '../../environments/environment';
import { isUndefined } from 'util';

@Injectable()
export class Web3Service {
  chainId = null;
  // @ts-ignore
  web3: Web3;

  constructor() {
    this.checkConnection();
    this.chainId = environment.chainId;
  }

  async checkConnection() {
    try {
      if (
        isUndefined(this.web3)
        ||
        isUndefined(this.web3.eth)
        ||
        isUndefined(this.web3.eth.net)
        ||
        !await this.web3.eth.net.isListening()
      ) {
        // @ts-ignore
        this.web3 = new Web3(environment.ethNode);
      }
    } catch (error) {
      // @ts-ignore
      this.web3 = new Web3(environment.ethNode);
    }
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
        this.web3.utils.padLeft(toAdd.address, 64),
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
