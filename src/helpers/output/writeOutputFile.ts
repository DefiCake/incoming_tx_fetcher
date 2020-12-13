import path from 'path';
import fs from 'fs-extra';

const FILE_PATH = path.resolve(__dirname, '../../OUTPUT.txt');

export default function appendToOutputFile(data: string): void {
  fs.appendFileSync(FILE_PATH, Buffer.from(data));
}
