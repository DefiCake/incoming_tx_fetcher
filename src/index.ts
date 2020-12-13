/** Dependencies && helpers */
import getLatestBlock from './helpers/etherscan/getLatestBlock';
import getSuitableEndBlock from './helpers/etherscan/getSuitableEndBlock';
import wait from './helpers/wait';
import {
  initializeDatabase,
  readBlockFromDatabase,
  updateDatabaseBlock,
} from './helpers/database/database';

/** Environment params */
import {
  WATCH_ADDRESS,
  NETWORK,
  OUTPUT,
  STATE_FILE,
  START_BLOCK,
  WAIT_TIME,
} from './helpers/config';
import getTransactions from './helpers/etherscan/getTransactions';
import appendToOutputFile from './helpers/output/writeOutputFile';

async function main() {
  if (START_BLOCK === 'latest') {
    console.log(`Initializing database, please wait`);
    await wait(WAIT_TIME);
    const latest = await getLatestBlock(NETWORK);
    initializeDatabase({ block: latest });
    await wait(WAIT_TIME);
  }

  while (true) {
    try {
      const startBlock = readBlockFromDatabase();
      const endBlock = await getSuitableEndBlock(startBlock, NETWORK);

      await wait(5000);

      if (typeof endBlock === 'number') {
        const transactions = await getTransactions(WATCH_ADDRESS, NETWORK, {
          address: WATCH_ADDRESS,
          startBlock,
          endBlock,
        });

        let data = '';
        for (const transaction of transactions) {
          const { value, from } = transaction;
          data += `MINT ${value} ${from}\r\n`;
        }

        if (data.length > 0) {
          console.log(data);
          appendToOutputFile(data);
        }

        updateDatabaseBlock(endBlock + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      await wait(WAIT_TIME);
    }
  }
}

export default main;
