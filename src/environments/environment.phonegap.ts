// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  // ethNode: 'ws://192.168.2.8:8546',
  ethNode: 'ws://10.10.12.64:8546',
  gas: 10000000,
  chainId: 3177,
  libAddrMap: [
    {
      libName: 'IdentityData',
      address: '91797482c0AFe099640f141867bD81be2F43e28E'
    },
    {
      libName: 'IdentityLib',
      address: '4A5bB74A5539cdB4481A495c2a82D12B5FE361fa'
    },
    {
      libName: 'ClaimHolderLib',
      address: '88e94a4b7bfc62a38d300d98ce1c09f30fb75e3e'
    }
  ]
};
