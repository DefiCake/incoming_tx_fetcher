import { ethers } from 'ethers';
import assert from 'assert';

import main from '../src';
import { readBlockFromDatabase } from '../src/helpers/database/database';
import wait from '../src/helpers/wait';

// Funds loaded with ether in ropsten network
const PRIVATE_KEY =
  '9cc3bf1640344b4dda8bb3ac3855d0da755e8385c56662bbd933f2555829d6b8';
const SENDER_ADDRESS = '0xaEE1C278d3F366FB2cDa7C0C12a0f03B63C6eF11';
const WATCH_ADDRESS = '0x733eF82604da06A31e9d0d8e4b44253b61aA212b';

describe('Main', () => {
  let wallet;

  before('setup the wallet and start fetching', async () => {
    wallet = new ethers.Wallet(
      PRIVATE_KEY,
      ethers.providers.getDefaultProvider()
    );
    main();
    await wait(20000);
  });

  describe('fetches transactions and writes to output file', () => {
    let previousBlock: number;
    let value: ethers.BigNumber;

    beforeEach('read block and send ether transaction', async () => {
      previousBlock = readBlockFromDatabase();
      value = ethers.utils.parseEther(`${(Math.random() * 0.0001).toFixed(5)}`);

      const transactionParams = {
        to: WATCH_ADDRESS,
        value,
      };

      await wallet.sendTransaction(transactionParams);
      await wallet.wait(1);
    });

    it('correctly increments local database blocks', async () => {
      await wait(15000);
      const currentBlock: number = readBlockFromDatabase();
      assert(
        currentBlock > previousBlock,
        `${currentBlock} is not greater than ${previousBlock}`
      );
    });

    it('correclty writes the output file', async () => {
      await wait(60000); // Wait for finality
      // Check output file
    });
  });
});
