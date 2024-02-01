import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'content', autoIncrement: true });

      //objectStore.createIndex("content", "content", {unique: false});

      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log(`putDb call received content -> ${content}`);
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({content: content});
  const result = await request;
  console.log('Data added to the jate database', result);
};

// Used to repopulate our editor after refreshing, quitting, etc..
// Imported by editor.js and a string of the complete state is returned
export const getDb = async () => {
  console.log('getDb was called');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result', result);
  return result.content;
};

initdb();
