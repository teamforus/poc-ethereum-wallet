import { WatchList } from './../Watcher/watchList';
import { Address, SignData, Signature, PrivateKey } from './types';
import { Keyring } from './keyring';
import { Account } from './account';

export class Accounts {

  public watches = new WatchList<Account, Address>();

  constructor(
    // @ts-ignore
    private web3: Web3,
    private keyring: Keyring
  ) { }

  async watch(filter?: Array<Address>) {
    const result = this.watches.addWatch(filter);

    const adresses = await this.keyring.keys();
    adresses.forEach(async (address) => {
      const account = await this.get(address);
      if (account) {
        this.watches.add(account);
      }
    });

    return result;
  }

  async new(): Promise<Account> {
    const web3Account = this.web3.eth.accounts.create();
    await this.keyring.set(web3Account.address, web3Account.privateKey);
    const account = new Account(web3Account.address, this.web3, this.keyring);
    this.watches.add(account);
    return account;
  }

  import(pk: PrivateKey): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      const web3Account = this.web3.eth.accounts.privateKeyToAccount(pk);

      const existingAccount = await this.get(web3Account.address);
      if (existingAccount) {
        resolve(existingAccount);
        return;
      }

      await this.keyring.set(web3Account.address, web3Account.privateKey);
      const account = new Account(web3Account.address, this.web3, this.keyring);
      this.watches.add(account);
      resolve(account);
    });
  }

  get(address: Address): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      const pk = await this.keyring.get(address);
      if (!pk) {
        resolve(null);
        return;
      }
      const web3Account = this.web3.eth.accounts.privateKeyToAccount(pk);
      if (web3Account.address !== address) {
        reject('Error geting account "' + address + '"');
        return;
      }

      resolve(new Account(web3Account.address, this.web3, this.keyring));
    });
  }

  async remove(address: Address): Promise<boolean> {
    const accountToRemove = await this.get(address);
    await this.keyring.remove(address);
    this.watches.remove(accountToRemove);
    return true;
  }

  async clear() {
    await this.keyring.clear();
    this.watches.clear();
  }

}
