import { saveState, loadState, initDB } from './storage.js'

export let state = {
  grading: 'classic',
  subjects: [],
  goals: [],
  language: 'de'
}

let nextId = 1
let persistTimeout = null

async function persist() {
  clearTimeout(persistTimeout)
  persistTimeout = setTimeout(async () => {
    await saveState(state)
  }, 100)
}

export async function initState() {
  await initDB()
  const loaded = await loadState()
  if (loaded) {
    state = loaded
    nextId = Math.max(...state.subjects.map(s => s.id), 0) + 1
  }
  return state
}

export function setGrading(mode) {
  state.grading = mode
  persist()
}

export function setLanguage(lang) {
  state.language = lang
  persist()
}

export function addSubject({ name, color, weight }) {
  const id = nextId++
  state.subjects.push({ id, name, color, weight, written: [], oral: [] })
  persist()
  return id
}

export function updateSubject(id, updates) {
  const s = state.subjects.find(x => x.id === id)
  if (!s) return false
  Object.assign(s, updates)
  persist()
  return true
}

export function deleteSubject(id) {
  const idx = state.subjects.findIndex(x => x.id === id)
  if (idx === -1) return false
  state.subjects.splice(idx, 1)
  persist()
  return true
}

export function addWrittenGrade(subjectId, value, date = new Date().toISOString().slice(0,10)) {
  const s = state.subjects.find(x => x.id === subjectId)
  if (!s) return false
  s.written.push({ id: Date.now(), value, date })
  persist()
  return true
}

export function addOralGrade(subjectId, value, type = 'Sonstige Leistung', date = new Date().toISOString().slice(0,10)) {
  const s = state.subjects.find(x => x.id === subjectId)
  if (!s) return false
  s.oral.push({ id: Date.now(), value, type, date })
  persist()
  return true
}

export function deleteGrade(subjectId, gradeId, category) {
  const s = state.subjects.find(x => x.id === subjectId)
  if (!s) return false
  const arr = category === 'written' ? s.written : s.oral
  const idx = arr.findIndex(g => g.id === gradeId)
  if (idx === -1) return false
  arr.splice(idx, 1)
  persist()
  return true
}

export function addGoal({ subjectId, targetGrade, deadline, description }) {
  const goal = {
    id: Date.now(),
    subjectId,
    targetGrade: parseFloat(targetGrade),
    deadline,
    description,
    achieved: false,
    createdAt: new Date().toISOString()
  }
  state.goals.push(goal)
  persist()
  return goal.id
}

export function updateGoal(id, updates) {
  const g = state.goals.find(x => x.id === id)
  if (!g) return false
  Object.assign(g, updates)
  persist()
  return true
}

export function deleteGoal(id) {
  const idx = state.goals.findIndex(x => x.id === id)
  if (idx === -1) return false
  state.goals.splice(idx, 1)
  persist()
  return true
}

export function importState(newState) {
  state.grading = newState.grading || state.grading
  state.subjects = newState.subjects || state.subjects
  state.goals = newState.goals || state.goals
  state.language = newState.language || state.language
  nextId = Math.max(...state.subjects.map(s => s.id), 0) + 1
  persist()
}
