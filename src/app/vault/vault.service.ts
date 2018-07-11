import { Web3Service } from './../web3.service';
import { Injectable } from '@angular/core';
import { Identity } from './identity';
import { Key } from './key';

@Injectable()
export class VaultService {
  private storateKeyIdentities = 'identities';
  private storateKeyKeys = 'keys';
  private identities: Identity[] = new Array<Identity>();
  private keys: Key[] = new Array<Key>();

  constructor(private web3Service: Web3Service) {
    const identities = <Identity[]> JSON.parse(localStorage.getItem(this.storateKeyIdentities));
    if (identities) {
      this.identities = identities;
    }
    const keys = <Key[]> JSON.parse(localStorage.getItem(this.storateKeyKeys));
    if (keys) {
      this.keys = keys;
    }
  }

  reset() {
    this.identities = new Array<Identity>();
    //this.keys = new Array<Key>();
    this.saveIdentities();
    //this.saveKeys();
  }

  getNonce(): number {
    let nonce = 1000000000;
    try {
      nonce = parseInt(localStorage.getItem('nonce'), 10);
    } catch (error) { }

    if (isNaN(nonce)) {
      nonce = 1000000000;
    }

    nonce++;
    localStorage.setItem('nonce', nonce.toString());
    return nonce;
  }

  private saveIdentities() {
    localStorage.setItem(this.storateKeyIdentities, JSON.stringify(this.identities));
  }

  private saveKeys() {
    localStorage.setItem(this.storateKeyKeys, JSON.stringify(this.keys));
  }

  getIdentities(): Identity[] {
    return this.identities;
  }

  getKeys(): Key[] {
    return this.keys;
  }

  addIdentity(name: string, identityAddress: string, managementKey: string) {
    for (const identity of this.identities) {
      if (identityAddress === identity.address) {
        throw new Error('An identity with this address already exists');
      }
    }

    const newIdentity = new Identity();
    newIdentity.name = name;
    newIdentity.address = identityAddress,
    newIdentity.keys.push({
      address: this.web3Service.web3.eth.accounts.privateKeyToAccount(managementKey).address,
      key: managementKey,
      purpose: 1
    });
    this.identities.push(newIdentity);

    this.saveIdentities();
  }


  async addKeyToIdentity(identityContract, managmentAccount, toAdd, purpose: number) {
    for (const identity of this.identities) {
      if (identityContract.options.address === identity.address) {
        for (const existingKey of identity.keys) {
          if (toAdd.privateKey === existingKey.key && purpose === existingKey.purpose) {
            throw new Error('The given key/purpose already exitst');
          }
        }

        let keyAdded = false;
        try {
          await this.web3Service.addKeyToIdentity(identityContract, managmentAccount, toAdd, purpose);
          keyAdded = true;
        } catch (error) {
          console.log(error);
        }

        if (keyAdded) {
          identity.keys.push({
            address: toAdd.address,
            key: toAdd.privateKey,
            purpose: purpose
          });
          this.saveIdentities();
          return;
        }

      }
    }

    throw new Error('Could not find an identity with this address');
  }

  getIdentity(identityAddress: string): Identity {
    for (const identity of this.identities) {
      if (identityAddress === identity.address) {
        return identity;
      }
    }

    return null;
  }

  getManagementKeys(identityAddress: string): Key[] {
    const result = new Array<Key>();
    const identity = this.getIdentity(identityAddress);
    for (const key of identity.keys) {
      if (1 === key.purpose) {
        result.push(key);
      }
    }
    return result;
  }

  addKey(privateKey: string) {
    for (const existingKey of this.keys) {
      if (privateKey === existingKey.key) {
        throw new Error('The given key already exitsts');
      }
    }
    this.keys.push({
      address: this.web3Service.web3.eth.accounts.privateKeyToAccount(privateKey).address,
      key: privateKey,
      purpose: 0});
    this.saveKeys();
  }

  getKeyByAddress(address: string) {
    for (const existingKey of this.keys) {
      if (existingKey.address === address) {
        return existingKey;
      }
    }
  }

}
