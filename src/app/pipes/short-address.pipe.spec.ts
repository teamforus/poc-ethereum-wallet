import { ShortAddressPipe } from './short-address.pipe';

describe('ShortAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
