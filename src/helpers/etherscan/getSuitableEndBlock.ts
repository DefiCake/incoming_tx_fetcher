import getLatestBlock from './getLatestBlock';

/** A sensible limit to avoid passing the limits of etherscan 's api */
const MAX_BLOCKS = 37;
/** We consider that a tx is final when it has received 3 confirmations */
const FINALITY = 3;

export default function getSuitableEndBlock(
  startBlock: number,
  network = 'ropsten'
): Promise<number | null> {
  return new Promise<number | null>((resolve, reject) => {
    getLatestBlock(network)
      .then((latestBlock) => {
        const maxBlock: number = startBlock + MAX_BLOCKS;
        const endBlock = Math.min(maxBlock, latestBlock - FINALITY);
        if (endBlock < startBlock) resolve(null);
        else resolve(endBlock);
      })
      .catch(reject);
  });
}
