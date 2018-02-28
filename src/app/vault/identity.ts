import { Key } from './key';

export class Identity {
  name: string;
  address: string;
  keys: Key[] = new Array<Key>();
}
