import { Web3Service, KeyPair } from './../web3.service';
import { Injectable } from '@angular/core';
import { Identity } from './identity';
import { Key } from './key';
import { isString, isObject } from 'util';
import { Token } from './token';
import { Voucher } from '@app/vault/voucher';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VaultService {
  private readonly STORAGE_KEY_KEYS = 'keys';
  private readonly STORAGE_KEY_TOKENS = 'tokens';
  private readonly STORAGE_KEY_VOUCHERS = 'vouchers';

  private _keys: Key[] = new Array<Key>();
  private _tokens: Token[] = new Array<Token>();
  private _vouchers: BehaviorSubject<Voucher[]> = new BehaviorSubject([]);

  constructor(
    private _web3Service: Web3Service
  ) {
    const keys = <Key[]>JSON.parse(localStorage.getItem(this.STORAGE_KEY_KEYS));
    if (keys) {
      this._keys = keys;
    }
    const tokens = JSON.parse(localStorage.getItem(this.STORAGE_KEY_TOKENS));
    if (tokens) {
      this._tokens = tokens;
    }
    const vouchers = JSON.parse(localStorage.getItem(this.STORAGE_KEY_VOUCHERS));
    if (vouchers) {
      this._vouchers.next(vouchers);
    }
  }

  addKey(privateKey: string) {
    for (const existingKey of this._keys) {
      if (privateKey === existingKey.key) {
        throw new Error('The given key already exitsts');
      }
    }
    this._keys.push({
      address: this._web3Service.web3.eth.accounts.privateKeyToAccount(privateKey).address,
      key: privateKey,
      purpose: 0
    });
    this.saveKeys();
  }

  addToken(token: Token) {
    this._tokens.push(token);
    this.saveTokens();
  }

  addVoucher(voucher: Voucher): boolean {
    try {
      const vouchers = this._vouchers.getValue();
      vouchers.push(voucher);
      this._vouchers.next(vouchers);
      this.saveVouchers();
      return true;
    } catch (e) {
      return false;
    }
  }

  createKey() {
    const keyPair: KeyPair = this._web3Service.createKeyPair();
    this.addKey(keyPair.privateKey);
  }

  getKeys(): Key[] {
    return this._keys;
  }

  getKeyByAddress(address: string): Key {
    for (const existingKey of this._keys) {
      if (existingKey.address === address) {
        return existingKey;
      }
    }
  }

  getKeyByPrivateKey(privateKey: string): Key {
    for (const key of this._keys) {
      if (key.key === privateKey) {
        return key;
      }
    }
  }

  getTokenByAddress(address: string): Token | false {
    this.getTokens().forEach(token => {
      if (token.address === address) {
        return token;
      }
    });
    return false;
  }

  getTokens(): Token[] {
    return this._tokens;
  }

  getVoucherByAddress(address: string): Voucher | false {
    const vouchers = this._vouchers.value;
    let result: Voucher|false = false;
    for (let i = 0; i < vouchers.length; i++) {
      if (vouchers[i].address === address) {
        result = vouchers[i];
      }
    }
    return result;
  }

  getVouchers(): Observable<Voucher[]> {
    return this._vouchers.asObservable();
  }

  get hasKey(): boolean {
    const keys = this.getKeys();
    return !!keys && !!keys.length;
  }

  reset() {
    this._keys = new Array<Key>();
    this._tokens = new Array<Token>();
    this._vouchers.next([]);
    this.saveKeys();
    this.saveTokens();
    this.saveVouchers();
  }

  private saveKeys() {
    localStorage.setItem(this.STORAGE_KEY_KEYS, JSON.stringify(this._keys));
  }

  private saveTokens() {
    localStorage.setItem(this.STORAGE_KEY_TOKENS, JSON.stringify(this._tokens));
  }

  private saveVouchers() {
    const json = this._vouchers.value;
    localStorage.setItem(this.STORAGE_KEY_VOUCHERS, JSON.stringify(json));
  }

}
