// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  ethNode: 'ws://54.77.160.67:8546',
  gas: 10000000,
  chainId: 3177,
  libAddrMap: [
    {
      libName: 'IdentityData',
      address: 'dB1c976DC0c4bfe907473f8Cf9C8D6881aA2BdD8'
    },
    {
      libName: 'IdentityLib',
      address: '74716616837Db1d96F55Fe47118298F75310183a'
    },
    {
      libName: 'ClaimHolderLib',
      address: 'f03A2D9dB737110B6aaf0E552a63711FA2A1f73b'
    }
  ]
};
