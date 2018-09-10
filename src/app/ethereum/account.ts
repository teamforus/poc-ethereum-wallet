import { Keyring } from './keyring';
import { Address, Signature, PrivateKey, SignData } from './types';
import { Transaction } from './types';

export class Account {

  constructor(
    private address: Address,
    // @ts-ignore
    private web3: Web3,
    private keyring: Keyring
  ) {}

  valueOf() {
    return this.getAddress();
  }

  private getPrivateKey(): Promise<PrivateKey> {
    return this.keyring.get(this.getAddress());
  }

  getAddress(): Address {
    return this.address;
  }

  async sign(data: SignData): Promise<Signature> {
    return this.web3.sign(data, await this.getPrivateKey());
  }

  async signTransaction(trx: Transaction): Promise<Object> {
    return this.web3.signTransaction(trx, await this.getPrivateKey());
  }
}
