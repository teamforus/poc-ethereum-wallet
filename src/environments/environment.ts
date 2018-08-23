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
      address: '1Fb06717EE4d5d3F5C715F893a2196105E01CB43'
    },
    {
      libName: 'IdentityLib',
      address: 'd15E447452Ea0eb1623f60667fD9D037bF9A785E'
    },
    {
      libName: 'ClaimHolderLib',
      address: 'c9766ebe697B6E03E0CdeB5fF87035752f6Ad3B1'
    }
  ]
};
