import https from 'https';
import { ERROR_API_RATE_EXCEEDED } from './constants';
import { IncomingMessage } from 'http';

interface NormalTransactionsRequestFilter {
  address: string;
  startBlock: string | number;
  endBlock: string | number;
}

interface Transaction {
  to: string;
  from: string;
  value: string;
}

function instanceOfIncomingTransaction(object: any): object is Transaction {
  return 'from' in object && 'value' in object;
}

function isArrayOfTransactions(data: Array<Object>): Boolean {
  try {
    for (const dataEntry of data) {
      if (!instanceOfIncomingTransaction(dataEntry)) {
        return false;
      }
    }
  } catch (e) {
    return false;
  }
  return true;
}

export default function getTransactions(
  address: string,
  network: string = 'ropsten',
  filter: NormalTransactionsRequestFilter
): Promise<Array<Transaction>> {
  return new Promise((resolve, reject) => {
    const url =
      `https://api-${network}.etherscan.io/api?` +
      'module=account&action=txlist' +
      `&address=${filter.address}` +
      `&startblock=${filter.startBlock}` +
      `&endBlock=${filter.endBlock}`;

    https.get(url, (response) => {
      let data = '';
      response.on('error', reject);
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => {
        const { status, message, result } = JSON.parse(data);
        if (status === '0' && message === ERROR_API_RATE_EXCEEDED) {
          reject(message);
        } else {
          if (!isArrayOfTransactions(result)) {
            console.log(data);
            reject('Invalid etherscan response');
          }

          // let asd = result.filter((transaction: Transaction) => {
          //   console.log(transaction.to === address);
          //   console.log(typeof transaction.to, typeof address);
          //   return transaction.from === address;
          // });

          resolve(
            result.filter(
              (transaction: Transaction) =>
                transaction.to.toLowerCase() === address.toLowerCase()
            )
          );
        }
      });
    });
  });
}
