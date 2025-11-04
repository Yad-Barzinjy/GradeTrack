// IndexedDB für persistente Datenspeicherung
const DB_NAME = 'schulnoten_db'
const DB_VERSION = 1
const STORE_NAME = 'app_state'

let db = null

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }
    
    request.onupgradeneeded = (e) => {
      const database = e.target.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

export async function saveState(state) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put({ id: 'current', data: state, timestamp: Date.now() })
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function loadState() {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get('current')
    
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.data)
      } else {
        resolve(null)
      }
    }
    request.onerror = () => reject(request.error)
  })
}

export async function createBackup() {
  if (!db) await initDB()
  const state = await loadState()
  if (!state) return
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const backupId = `backup_${Date.now()}`
    const request = store.put({ id: backupId, data: state, timestamp: Date.now() })
    
    request.onsuccess = () => resolve(backupId)
    request.onerror = () => reject(request.error)
  })
}

export async function listBackups() {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAllKeys()
    
    request.onsuccess = () => {
      const backups = request.result.filter(key => key.startsWith('backup_'))
      resolve(backups)
    }
    request.onerror = () => reject(request.error)
  })
}

export async function restoreBackup(backupId) {
  if (!db) await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(backupId)
    
    request.onsuccess = async () => {
      if (request.result) {
        await saveState(request.result.data)
        resolve(request.result.data)
      } else {
        reject(new Error('Backup nicht gefunden'))
      }
    }
    request.onerror = () => reject(request.error)
  })
}
