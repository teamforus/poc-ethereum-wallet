import { WatchList } from './../Watcher/watchList';
import { Erc20Token } from './erc20token';
import { Address } from './types';

export class Erc20Tokens {

  private watches = new WatchList<Erc20Token, Address>();

  constructor(
    // @ts-ignore
    private web3: Web3,
    private localStorageKey = 'Erc20Tokens'
  ) {}

  watch(filter?: Array<Address>) {
    const result = this.watches.addWatch(filter);

    const tokenAdresses = localStorage.getItem(this.localStorageKey).split(',');
    tokenAdresses.forEach(tokenAddress => {
      this.watches.add(this.get(tokenAddress));
    });

    return result;
  }

  add(address: Address): Erc20Token {
    const token = new Erc20Token(address, this.web3);

    let tokenAdresses = localStorage.getItem(this.localStorageKey);
    if (!tokenAdresses.toUpperCase().includes(address.toUpperCase())) {
      const tokenAdressesArray = tokenAdresses.split(',');
      tokenAdressesArray.push(address);
      tokenAdresses = tokenAdressesArray.join(',');
      localStorage.setItem(this.localStorageKey, tokenAdresses);
    }

    this.watches.add(token);
    return token;
  }

  get(address: Address): Erc20Token {
    return new Erc20Token(address, this.web3);
  }

  forget(addressToForget: Address) {
    this.watches.remove(this.get(addressToForget));
    const tokenAdresses = localStorage.getItem(this.localStorageKey).split(',');

    const tokenAdressesUpper = localStorage.getItem(this.localStorageKey).toUpperCase().split(',');
    const addressToForgetUpper = addressToForget.toUpperCase();
    let indexToRemove = -1;
    while (-1 !== (indexToRemove = tokenAdressesUpper.findIndex((addressUpper) => addressUpper === addressToForgetUpper))) {

    }


  }
}
