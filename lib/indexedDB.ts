const DB_NAME = 'resume-ai-db';
const STORE_NAME = 'resumes';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

function getDB(): Promise<IDBDatabase> {
  if (db) return Promise.resolve(db);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function savePDFFile(file: File): Promise<void> {
  if (typeof window === 'undefined') return;

  const database = await getDB();
  const arrayBuffer = await file.arrayBuffer();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put({
      id: 'resume-pdf',
      file: arrayBuffer,
      fileName: file.name,
      timestamp: Date.now(),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();

    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getPDFFile(): Promise<File | null> {
  if (typeof window === 'undefined') return null;

  const database = await getDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('resume-pdf');

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const data = request.result;
      if (!data) {
        resolve(null);
        return;
      }

      const blob = new Blob([data.file], { type: 'application/pdf' });
      const file = new File([blob], data.fileName, { type: 'application/pdf' });
      resolve(file);
    };

    transaction.onerror = () => reject(transaction.error);
  });
}

export async function clearPDFFile(): Promise<void> {
  if (typeof window === 'undefined') return;

  const database = await getDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete('resume-pdf');

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();

    transaction.onerror = () => reject(transaction.error);
  });
}
