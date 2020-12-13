import path from 'path';
import { databaseExists, readBlockFromDatabase } from './database/database';
import { isAddress } from 'web3-utils';

require('dotenv-defaults').config();

let watchAddressArg: string = '';
for (let arg of process.argv) {
  if (isAddress(arg)) {
    watchAddressArg = arg;
    break;
  }
}

export const WATCH_ADDRESS: string =
  watchAddressArg ||
  process.env.WATCH_ADDRESS ||
  '0x733eF82604da06A31e9d0d8e4b44253b61aA212b';
// '0xe206E5Cb1fc643908A75906Af6F919a487Af76AC';

export const NETWORK: string = process.env.NETWORK || 'ropsten';
export const OUTPUT: string =
  process.env.OUTPUT || path.resolve(__dirname, '../OUTPUT.txt');

export const STATE_FILE = path.resolve(__dirname, '../STATE');

let startBlock: string | undefined;

if (databaseExists()) {
  startBlock = readBlockFromDatabase().toString();
}

if (process.env.START_BLOCK) {
  if (startBlock) {
    if (parseInt(process.env.START_BLOCK) > parseInt(startBlock)) {
      console.log(
        'WARNING: last fetched block as per the last run is ',
        startBlock,
        ', while a custom start block ',
        process.env.START_BLOCK,
        " has been defined. Blocks in-between won't be indexed"
      );
    } else {
      console.log(
        `ERROR: cannot pass a start block (${process.env.START_BLOCK})`,
        `lower than the last fetched block (${startBlock}), `,
        'this could lead to duplication of entries. Delete the database first'
      );
    }
  }
}

if (!startBlock) startBlock = 'latest';

export const START_BLOCK = startBlock;
export const WAIT_TIME: number =
  (process.env.WAIT_TIME && parseInt(process.env.WAIT_TIME)) || 15000;
