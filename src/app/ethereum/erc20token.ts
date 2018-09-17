import { Address } from './types';
import Web3 from 'web3';


export class Erc20Token {

  constructor(
    private contract: Address,
    private web3: Web3
  ) {}

  valueOf() {
    return this.contract;
  }

  name(): string {
    return '';
  }

  symbol(): string {
    return '';
  }

  decimals(): number {
    return 0;
  }

  totalSupply(): number {
    return 0;
  }

  balanceOf(owner: Address): number {
    return 0;
  }

  transfer(to: Address, value: number): boolean {
    return false;
  }

  transferFrom(from: Address, to: Address, value: number): boolean {
    return false;
  }

  approve(spender: Address, value: number): boolean {
    return false;
  }

  allowance(owner: Address, spender: Address): number {
    return 0;
  }

}
