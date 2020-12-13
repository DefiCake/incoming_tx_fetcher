import https from 'https';

export default function getLatestBlock(network = 'ropsten'): Promise<number> {
  return new Promise((resolve, reject) => {
    const url =
      `https://api-${network}.etherscan.io/api?` +
      'module=proxy&action=eth_blockNumber';

    https.get(url, (response) => {
      let data = '';
      response.on('error', reject);
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => {
        const { status, result } = JSON.parse(data);
        if (status === '0') {
          reject(result);
        } else {
          resolve(parseInt(result, 16));
        }
      });
    });
  });
}
