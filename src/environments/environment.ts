// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ethNode: 'ws://127.0.0.1:8546',
  gas: 10000000,
  chainId: 3177,
  libAddrMap: [
    {
      libName: 'IdentityData',
      address: 'b1a63262FD865D3813a799eC1D0ade3B3891179f'
    },
    {
      libName: 'IdentityLib',
      address: '1532164Bb9A7f928776Ac3fc0A5F04abDa03e952'
    },
    {
      libName: 'ClaimHolderLib',
      address: '87fdd7492317bE986B9e950655ad2862B13Ca2Df'
    }
  ]
};
