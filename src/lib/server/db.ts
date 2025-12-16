import { Database } from 'bun:sqlite';

export const db = new Database('chinook.db', { readonly: true });
