# Transaction fetcher

## What does this do

Queries etherscan 's API endpoints to fetch incoming transaction to an address.

Detected transactions are logged to a txt file.

## Use

Run `yarn` or `yarn install` to install dependencies

Run `yarn build` to build the pure javascript app

Run `yarn start <YOUR_ADDRESS>` to begin fetching (after building) or `yarn dev` to run the dev environment

Run `yarn test` to run some automated tests with a supplied private key.

## Env vars

- `WATCH_ADDRESS`: ethereum address you want to watch.
- `NETWORK`: lets you pick the public network (ropsten, kovan, rinkeby, goerli)
- `START_BLOCK`: lets you pick a starting point from where you want to log the transactions
- `WAIT_TIME`: adjust the time between etherscan 's API calls to avoid rate limiting.
- `OUTPUT`: defines the path for the output file.

## Priority of config variables

Configuration variables are picked in the following order:

- Args passed by CLI
- Environment variables
- Default

That means: if you run `WATCH_ADDRESS=<ADDRESS1> yarn start <ADDRESS2>`, `ADDRESS2` will be chosen before ADDRESS1

## Notice

Transactions will not be automatically reflected. The app goes 3 blocks behind etherscan to ensure that no block reorgs spoil the final result. So you will have to wait ~45 seconds before seeing your transactions in the log

Tests have not been thoroughly implemented. There might be bugs.
