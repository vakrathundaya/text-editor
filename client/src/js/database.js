import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


  // TODO: Add logic to a method that accepts some content and adds it to the database
  export const putDb = async (content) => {
    console.log('PUT to database');
      // Create a connection to the database database and version we want to use.
    const jateDb = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = jateDb.transaction('jate', 'readwrite');
    // Open up the desired object store.
    const store = tx.objectStore('jate');
    const req = store.put({ id: 1, value: content });
    // Get confirmation of the request.
    const res = await req;
    console.log('putDb successfully implemented', res)
  };
  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
    console.log('get all content from databse');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    // const req = store.getAll();
    const req = store.get(1);
    const res = await req;
    console.log('getDb implemented successfully', res)
    return res?.value;  
  };

initdb();
