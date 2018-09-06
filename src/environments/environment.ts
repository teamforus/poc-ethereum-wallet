// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ethNode: 'ws://127.0.0.1:8546',
  // ethNode: 'ws://10.10.12.42:8546',
  gas: 10000000,
  chainId: 3177,
  libAddrMap: [
    {
      libName: 'IdentityData',
      address: '857F22BBB2929Cf2bC7B3F9dcd328884382e2FC6'
    },
    {
      libName: 'IdentityLib',
      address: 'dB1c976DC0c4bfe907473f8Cf9C8D6881aA2BdD8'
    },
    {
      libName: 'ClaimHolderLib',
      address: 'f03A2D9dB737110B6aaf0E552a63711FA2A1f73b'
    }
  ],
  ClaimTopicMap: {
    '123': 'BSN'
  },
  ClaimIssuerMap: {
    '0x8E01d50836F709D97b0e34BaF7d1c306D09F925B': 'BSN validator'
  }
};
