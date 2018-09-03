import { Injectable } from '@angular/core';
import { VaultService } from '@app/vault/vault.service';
import { Web3Service } from '@app/web3.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Identity } from '@app/vault/identity';
import { Observable } from 'rxjs/Observable';
import { Key } from '@app/vault/key';
import { isString, isObject } from 'util';

@Injectable()
export class IdentityService {
  private readonly STORAGE_KEY = 'identities';

  private _identities: BehaviorSubject<Identity[]> = new BehaviorSubject([]);

  constructor(
    private _vaultService: VaultService,
    private _web3Service: Web3Service
  ) {
    const identities = <Identity[]>JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    if (identities) {
      this._identities.next(identities);
    }
  }

  addIdentity(name: string, identityAddress: string, managementKey: string = null) {
    const identities = this._identities.getValue();
    for (const identity of identities) {
      if (identityAddress === identity.address) {
        throw new Error('An identity with this address already exists');
      }
    }

    const newIdentity = new Identity();
    newIdentity.name = name;
    newIdentity.address = identityAddress;
    if (managementKey) {
      newIdentity.keys.push({
        address: this._web3Service.web3.eth.accounts.privateKeyToAccount(managementKey).address,
        key: managementKey,
        purpose: 1
      });
    }
    identities.push(newIdentity);
    this._identities.next(identities);
    this.saveIdentities();
  }

  async addKeyToIdentity(identityContract, managmentAccount, toAdd, purpose: number) {
    const identities = this._identities.getValue();
    for (const identity of identities) {
      if (identityContract.options.address === identity.address) {
        for (const existingKey of identity.keys) {
          if (toAdd.privateKey === existingKey.key && purpose === existingKey.purpose) {
            throw new Error('The given key/purpose already exitst');
          }
        }

        let keyAdded = false;
        try {
          await this._web3Service.addKeyToIdentity(identityContract, managmentAccount, toAdd, purpose);
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

  /**
   * Return the observable of identities.
   * @returns The identities.
   */
  getIdentities(): Observable<Identity[]> {
    return this._identities.asObservable();
  }

  /**
   * Get the identity of a matching address
   * @param address the address of the identity
   * @returns Returns the identity if the app has it, or false if
   * not found.
   */
  getIdentityByAddress(address: string): Identity | false {
    const identities = this._identities.getValue();
    for (let i = 0; i < identities.length; i++) {
      if (identities[i].address === address) {
        return identities[i];
      }
    }
    return false;
  }

  getManagementKeys(identityAddress: string): Key[] {
    const result = new Array<Key>();
    const identity = this.getIdentityByAddress(identityAddress);
    if (!identity) {
      return null;
    }
    for (const key of identity.keys) {
      if ('1' === key.purpose.toString()) {
        result.push(key);
      }
    }
    return result;
  }

  getKeysByPurpose(identity: string | Identity, purpose: number): Array<Key> {
    const result = new Array<Key>();
    if (isString(identity)) {
      const tmp = this.getIdentityByAddress(identity as string);
      if (!!tmp) {
        identity = tmp;
      }
    }

    if (!isObject(identity)) {
      return result;
    }

    const purposeStr = purpose.toString();
    for (const key of (identity as Identity).keys) {
      if (purposeStr === key.purpose.toString()) {
        result.push(key);
      }
    }

    return result;
  }

  hasIdentityWithAddress(address: string): boolean {
    let found = false;
    const identities = this._identities.getValue();
    for (let i = 0; i < identities.length; i++) {
      if (identities[i].address === address) {
        found = true;
      }
    }
    return found;
  }

  hasIdentityWithName(name: string): boolean {
    let found = false;
    const identities = this._identities.getValue();
    for (let i = 0; i < identities.length; i++) {
      if (identities[i].name === name) {
        found = true;
      }
    }
    return found;
  }

  importIdentityKey(identity, keyAddress, pk, purpose) {
    identity.keys.push({
      address: keyAddress,
      key: pk,
      purpose: purpose
    });
    this.saveIdentities();
  }

  reset() {
    this._identities.next([]);
    this.saveIdentities();
  }

  private saveIdentities() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._identities));
  }

}
