import { HexToUtf8Pipe } from './hex-to-utf8.pipe';

describe('HexToUtf8Pipe', () => {
  it('create an instance', () => {
    const pipe = new HexToUtf8Pipe();
    expect(pipe).toBeTruthy();
  });
});
