// Profile Management für Multi-User Support
import { initDB, loadState, saveState } from './storage.js'

let currentProfile = 'default'
let allProfiles = {}

/**
 * Initialisiert das Profil-System
 */
export async function initProfiles() {
  await initDB()
  
  // Lade alle Profile aus IndexedDB
  const db = await openProfileDB()
  const tx = db.transaction('profiles', 'readonly')
  const store = tx.objectStore('profiles')
  const allProfilesData = await store.getAll()
  
  allProfiles = {}
  if (allProfilesData.length === 0) {
    // Erstelle Default-Profil mit aktuellen Daten
    const currentState = await loadState()
    allProfiles.default = {
      id: 'default',
      name: 'Mein Profil',
      grading: currentState.grading || 'classic',
      subjects: currentState.subjects || [],
      goals: currentState.goals || []
    }
    await saveProfile('default', allProfiles.default)
  } else {
    allProfilesData.forEach(profile => {
      allProfiles[profile.id] = profile
    })
  }
  
  // Lade aktuelles Profil aus localStorage
  const savedProfile = localStorage.getItem('currentProfile')
  if (savedProfile && allProfiles[savedProfile]) {
    currentProfile = savedProfile
  } else {
    currentProfile = 'default'
  }
  
  return allProfiles
}

/**
 * Öffnet die Profile-Datenbank
 */
function openProfileDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('GradeTrackProfiles', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles', { keyPath: 'id' })
      }
    }
  })
}

/**
 * Speichert ein Profil in IndexedDB
 */
async function saveProfile(id, profileData) {
  const db = await openProfileDB()
  const tx = db.transaction('profiles', 'readwrite')
  const store = tx.objectStore('profiles')
  await store.put(profileData)
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

/**
 * Gibt das aktuelle Profil zurück
 */
export function getCurrentProfile() {
  return currentProfile
}

/**
 * Gibt alle Profile zurück
 */
export function getAllProfiles() {
  return allProfiles
}

/**
 * Wechselt zu einem anderen Profil
 */
export async function switchProfile(profileId) {
  if (!allProfiles[profileId]) {
    throw new Error(`Profil ${profileId} existiert nicht`)
  }
  
  currentProfile = profileId
  localStorage.setItem('currentProfile', profileId)
  
  // Lade Profildaten in den aktuellen State
  const profile = allProfiles[profileId]
  await saveState({
    grading: profile.grading,
    subjects: profile.subjects,
    goals: profile.goals
  })
  
  return profile
}

/**
 * Erstellt ein neues Profil
 */
export async function createProfile(name, gradingSystem = 'classic') {
  const id = `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const newProfile = {
    id,
    name,
    grading: gradingSystem,
    subjects: [],
    goals: []
  }
  
  allProfiles[id] = newProfile
  await saveProfile(id, newProfile)
  
  return newProfile
}

/**
 * Löscht ein Profil
 */
export async function deleteProfile(profileId) {
  if (profileId === 'default') {
    throw new Error('Das Standard-Profil kann nicht gelöscht werden')
  }
  
  if (!allProfiles[profileId]) {
    throw new Error(`Profil ${profileId} existiert nicht`)
  }
  
  // Wechsle zu default, falls aktuelles Profil gelöscht wird
  if (currentProfile === profileId) {
    await switchProfile('default')
  }
  
  // Lösche aus Datenbank
  const db = await openProfileDB()
  const tx = db.transaction('profiles', 'readwrite')
  const store = tx.objectStore('profiles')
  await store.delete(profileId)
  
  delete allProfiles[profileId]
  
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

/**
 * Aktualisiert das aktuelle Profil mit neuen Daten
 */
export async function updateCurrentProfile(data) {
  const profile = allProfiles[currentProfile]
  
  if (data.grading) profile.grading = data.grading
  if (data.subjects) profile.subjects = data.subjects
  if (data.goals) profile.goals = data.goals
  
  await saveProfile(currentProfile, profile)
  allProfiles[currentProfile] = profile
}

/**
 * Umbenennen eines Profils
 */
export async function renameProfile(profileId, newName) {
  if (!allProfiles[profileId]) {
    throw new Error(`Profil ${profileId} existiert nicht`)
  }
  
  allProfiles[profileId].name = newName
  await saveProfile(profileId, allProfiles[profileId])
}
