import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Message } from '@/types/message';

interface UnsentDB extends DBSchema {
  messages: {
    key: string;
    value: Message;
    indexes: {
      'by-date': string;
      'by-emotion': string;
    };
  };
}

const DB_NAME = 'unsent-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<UnsentDB>> | null = null;

function getDB(): Promise<IDBPDatabase<UnsentDB>> {
  if (!dbPromise) {
    dbPromise = openDB<UnsentDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore('messages', { keyPath: 'id' });
        store.createIndex('by-date', 'createdAt');
        store.createIndex('by-emotion', 'emotion');
      },
    });
  }
  return dbPromise;
}

export const storage = {
  async getAllMessages(): Promise<Message[]> {
    const db = await getDB();
    const messages = await db.getAllFromIndex('messages', 'by-date');
    return messages.reverse();
  },

  async getMessage(id: string): Promise<Message | undefined> {
    const db = await getDB();
    return db.get('messages', id);
  },

  async saveMessage(message: Message): Promise<void> {
    const db = await getDB();
    await db.put('messages', message);
  },

  async deleteMessage(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('messages', id);
  },

  async clearAllMessages(): Promise<void> {
    const db = await getDB();
    await db.clear('messages');
  },
};
