# Arweave Contracts JS Template

## Install

Using npm,

```sh
npm install
```

Using yarn,

```sh
yarn
```

Using pnpm,

```sh
pnpm install
```

## Wallet Keyfile

If `wallet.json` wallet keyfile is not present in .secrets directory or wallet keyfile path is not provided as an environment variable `WALLET_PATH`, it is auto created.

Wallet keyfile path can also be provided as an environment variable. Rename `.env.example` to `.env` and provide `WALLET_PATH` value.

## Scripts

### Deploy to Mainnet

```sh
# yarn
yarn deploy:mainnet

# npm
npm run deploy:mainnet

# pnpm
pnpm run deploy:mainnet
```

### Deploy to Testnet

```sh
# yarn
yarn deploy:testnet

# npm
npm run deploy:testnet

# pnpm
pnpm run deploy:testnet
```

### Test

```sh
# yarn
yarn test

# npm
npm run test

# pnpm
pnpm run test
```

## Author

👤 **Pawan Paudel**

- Github: [@pawanpaudel93](https://github.com/pawanpaudel93)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! \ Feel free to check [issues page](https://github.com/pawanpaudel93/arweave-contracts-js-template/issues).

## Show your support

Give a ⭐️ if this project helped you!
