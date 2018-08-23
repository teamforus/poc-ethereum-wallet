import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { environment } from '../environments/environment';
import { isUndefined } from 'util';
import * as IdentityContractData from '@contracts/identity.js';
import { Transaction } from 'web3/types';

/**
 * Class to represent https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#returns
 * Can be used as cast for web3.eth.create() or web3.eth.privateKeyToAccount(prvtKey)
 */
export class KeyPair {
  public address: string;
  public privateKey: string;
  public encrypt: Function;
  public sign: Function;
  public signTransaction: Function;
}

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
        !await this.web3.eth.net.isListening()) {
        // @ts-ignore
        this.web3 = new Web3(environment.ethNode);
      }
    } catch (error) {
      // @ts-ignore
      this.web3 = new Web3(environment.ethNode);
    }
  }

  createKeyPair(): KeyPair {
    return new this.web3.eth.accounts.create() as KeyPair;
  }

  async estimateTransactionSuccess(transaction: Object): Promise<boolean> {
    try {
      this.checkConnection();
      const gas = this.web3.eth.estimateGas(transaction);
      return (gas > 0);
    } finally {
      return false;
    }
  }

  async getCreateIdentityTransaction(sender: string): Promise<Object> {
    const IdentityContract = new this.web3.eth.Contract(
      IdentityContractData.abi,
      null,
      null
    );

    // Set libraries in contract binary
    let contractBin = IdentityContractData.bin;
    environment.libAddrMap.forEach((addrMap) => {
      const placeholder = ('__' + addrMap.libName + '.sol:' + addrMap.libName).padEnd(40, '_');
      contractBin = contractBin.replace(new RegExp(placeholder, 'g'), addrMap.address);
    });

    // Setup method
    const deploy = IdentityContract.deploy(
      { data: contractBin }
    );

    const trx = {
      chainId: this.chainId,
      data: deploy._deployData,
      gas: environment.gas,
      nonce: this.getNonce(sender)
    };
    return trx;
  }

  async getKeyPairFromPrivateKey(privateKey: string): Promise<KeyPair> {
    return this.web3.eth.accounts.privateKeyToAccount(privateKey) as KeyPair;
  }

  async sendSignedTransaction(trx: object, privateKey: string) {
    this.checkConnection();
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

  /**
   * Calculate the nonce of a transaction made by a sender.
   * @param senderAddress The address of the sender
   */
  private async getNonce(senderAddress: string): Promise<number> {
    this.checkConnection();
    return await this.web3.eth.getTransactionCount(senderAddress);
  }

}
