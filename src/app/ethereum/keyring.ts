import { PrivateKey, Address } from './types';
import { environment } from '../../environments/environment';

export class Keyring {

  private storage = null;

  constructor() {
    // @ts-ignore
    this.storage = new cordova.plugins.SecureStorage(
      () => {},
      (error) => { throw new Error(error); },
      environment.keyringNamespace
    );
  }

  get(address: Address): Promise<PrivateKey> {
    return new Promise((resolve, reject) => {
      this.storage.get(
        (value) => { resolve(value); },
        (error) => { reject(error); },
        address
      );
    });
  }

  set(address: Address, pk: PrivateKey): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.set(
        () => { resolve(true); },
        (error) => { reject(error); },
        address,
        pk
      );
    });
  }

  keys(): Promise<Array<Address>> {
    return new Promise((resolve, reject) => {
      this.storage.keys(
        (keys) => {
          const result = new Array<Address>();
            keys.forEach(key => {
              result.push(key);
            });
          resolve(result);
        },
        (error) => { reject(error); }
      );
    });
  }

  remove(address: Address): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.remove(
        () => { resolve(true); },
        (error) => { reject(error); },
        address
      );
    });
  }

  clear(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.clear(
        () => { resolve(true); },
        (error) => { reject(error); }
      );
    });
  }

}
