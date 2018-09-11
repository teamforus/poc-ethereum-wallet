import { Keyring } from './keyring';
import { Address, Signature, PrivateKey, SignData, EtherBalance } from './types';
import { Transaction } from './types';

export class Account {

  balance: EtherBalance = 0;

  constructor(
    private address: Address,
    // @ts-ignore
    private web3: Web3,
    private keyring: Keyring
  ) {
    this.updateBalance();
    this.web3.eth.subscribe('newBlockHeaders', this.updateBalance );
  }

  valueOf() {
    return this.getAddress();
  }

  private updateBalance() {
    this.web3.eth.getBalance(this.address).then(balance => { this.balance = balance; });
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
