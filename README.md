# Transaction fetcher

Run `yarn` or `yarn install` to install dependencies

Run `yarn build` to build the pure javascript app

Run `yarn start <YOUR_ADDRESS>` to begin fetching (after building) or `yarn dev` to run the dev environment

Run `yarn test` to run some automated tests with a supplied private key.

## Notice

Transactions will not be automatically reflected. The app goes 3 blocks behind etherscan to ensure that no block reorgs spoil the final result. So you will have to wait ~45 seconds before seeing your transactions in the log
