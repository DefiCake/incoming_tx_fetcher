import fs from 'fs-extra';
import path from 'path';

const DATABASE_PATH = path.resolve(__dirname, '../../.DATABASE');
export interface Database {
  block: number;
}

export function databaseExists(): Boolean {
  return fs.existsSync(DATABASE_PATH);
}

export function initializeDatabase(database: Database) {
  fs.writeJsonSync(DATABASE_PATH, database);
}

export function readBlockFromDatabase(): number {
  const database = fs.readJsonSync(DATABASE_PATH);
  return database.block;
}

export function updateDatabaseBlock(block: number) {
  let database = fs.readJsonSync(DATABASE_PATH);
  fs.writeJsonSync(DATABASE_PATH, { ...database, block });
}
