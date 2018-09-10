export type Address = string;
export type Signature = string;
export type SignData = string;
export type PrivateKey = string;
export interface Keypair {public: string; private: string; }
export interface Transaction {
  from?: Address;
  to?: Address;
  chainId?: Number;
  gas?: Number;
  data?: String;
}
