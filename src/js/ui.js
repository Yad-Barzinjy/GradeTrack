import { state, addWrittenGrade, addOralGrade, setGrading, updateSubject, deleteSubject, deleteGrade, addGoal, updateGoal, deleteGoal } from './state.js'
import { averageForSubject, classicToNumber, pointsToNumber } from './grades.js'
import { showFormModal, showConfirmDialog, showToast } from './modal.js'
import { t } from './i18n.js'
import { formatGradeDisplay, formatGradeWithLabel } from './display.js'

export function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'))
  const el = document.getElementById(`view-${view}`)
  if (el) el.classList.add('active')
  if (view === 'entwicklungen') renderTrends(state)
  if (view === 'ziele') renderGoals(state)
  if (view === 'uebersicht') renderOverview(state)
}

export function renderSubjects(s) {
  const container = document.getElementById('subjects-list')
  if (!container) return
  
  container.innerHTML = ''
  
  if (s.subjects.length === 0) {
    container.innerHTML = `<div class="card" style="grid-column: 1 / -1;"><p class="hint">${t('noData')}</p></div>`
    return
  }
  
  s.subjects.forEach(sub => {
    const avg = averageForSubject(sub, s.grading)
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <div class="title">
        <span class="dot" style="background:${sub.color}"></span>
        ${sub.name}
      </div>
      <div class="badge">${t('weighting')}: ${sub.weight.written}/${sub.weight.oral}</div>
      <div class="badge badge-primary">${t('average')}: ${formatGradeWithLabel(avg, s.grading)}</div>
      
      ${sub.written.length > 0 ? `
        <div style="margin-top:1rem">
          <strong style="font-size:0.9rem;color:var(--text-secondary)">${t('written')}:</strong>
          ${sub.written.map(g => `
            <div class="grade-item">
              <div>
                <span class="grade-value">${g.value}</span>
                <span class="grade-meta"> • ${g.date}</span>
              </div>
              <button class="btn-icon" data-act="delete-w" data-id="${g.id}" title="${t('delete')}">🗑</button>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${sub.oral.length > 0 ? `
        <div style="margin-top:1rem">
          <strong style="font-size:0.9rem;color:var(--text-secondary)">${t('oral')}:</strong>
          ${sub.oral.map(g => `
            <div class="grade-item">
              <div>
                <span class="grade-value">${g.value}</span>
                <span class="grade-meta"> • ${g.type} • ${g.date}</span>
              </div>
              <button class="btn-icon" data-act="delete-o" data-id="${g.id}" title="${t('delete')}">🗑</button>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="actions">
        <button data-act="add-w" class="btn-primary">${t('addWritten')}</button>
        <button data-act="add-o" class="btn-secondary">${t('addOral')}</button>
        <button data-act="edit" class="btn-icon" title="${t('edit')}">✏️</button>
        <button data-act="delete" class="btn-icon" title="${t('delete')}">🗑</button>
      </div>
    `
    
    card.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-act]')
      if (!btn) return
      
      const act = btn.dataset.act
      
      if (act === 'add-w') {
        showAddGradeModal(sub.id, 'written')
      } else if (act === 'add-o') {
        showAddGradeModal(sub.id, 'oral')
      } else if (act === 'edit') {
        showEditSubjectModal(sub)
      } else if (act === 'delete') {
        showConfirmDialog(t('deleteConfirm'), () => {
          deleteSubject(sub.id)
          renderSubjects(state)
          renderOverview(state)
          renderTrends(state)
          showToast(`${sub.name} gelöscht`, 'success')
        })
      } else if (act === 'delete-w') {
        const gradeId = parseInt(btn.dataset.id)
        deleteGrade(sub.id, gradeId, 'written')
        renderSubjects(state)
        renderOverview(state)
        renderTrends(state)
        showToast('Note gelöscht', 'success')
      } else if (act === 'delete-o') {
        const gradeId = parseInt(btn.dataset.id)
        deleteGrade(sub.id, gradeId, 'oral')
        renderSubjects(state)
        renderOverview(state)
        renderTrends(state)
        showToast('Note gelöscht', 'success')
      }
    })
    
    container.appendChild(card)
  })
}

function showAddGradeModal(subjectId, category) {
  const isWritten = category === 'written'
  const fields = [
    {
      name: 'value',
      label: t('enterGrade'),
      type: 'text',
      placeholder: state.grading === 'classic' ? '1+, 2-, 3...' : '0-15',
      required: true
    },
    ...(!isWritten ? [{
      name: 'type',
      label: t('gradeType'),
      type: 'text',
      placeholder: 'Referat, Kurztest, Vokabeltest...',
      value: 'Sonstige Leistung'
    }] : []),
    {
      name: 'date',
      label: t('date'),
      type: 'date',
      value: new Date().toISOString().slice(0, 10),
      required: true
    }
  ]
  
  showFormModal(
    isWritten ? t('addWritten') : t('addOral'),
    fields,
    (data) => {
      // Validate grade
      const converter = state.grading === 'classic' ? classicToNumber : pointsToNumber
      const numeric = converter(data.value)
      
      if (numeric === null) {
        showToast(t('invalidGrade'), 'error')
        return false
      }
      
      if (isWritten) {
        addWrittenGrade(subjectId, data.value, data.date)
      } else {
        addOralGrade(subjectId, data.value, data.type || 'Sonstige Leistung', data.date)
      }
      
      renderSubjects(state)
      renderOverview(state)
      renderTrends(state)
      showToast('Note hinzugefügt', 'success')
    }
  )
}

function showEditSubjectModal(subject) {
  showFormModal(
    `${subject.name} bearbeiten`,
    [
      { name: 'name', label: t('subjectName'), type: 'text', value: subject.name, required: true },
      { name: 'color', label: t('color'), type: 'color', value: subject.color },
      { name: 'written', label: 'Gewichtung Schriftlich (%)', type: 'number', value: subject.weight.written, required: true },
      { name: 'oral', label: 'Gewichtung Mündlich (%)', type: 'number', value: subject.weight.oral, required: true }
    ],
    (data) => {
      if (!data.name) {
        showToast(t('fillAllFields'), 'error')
        return false
      }
      
      updateSubject(subject.id, {
        name: data.name,
        color: data.color,
        weight: {
          written: parseInt(data.written) || 60,
          oral: parseInt(data.oral) || 40
        }
      })
      
      renderSubjects(state)
      renderOverview(state)
      showToast('Fach aktualisiert', 'success')
    }
  )
}

export function renderOverview(s) {
  const el = document.getElementById('overview')
  if (!el) return
  
  el.innerHTML = ''
  
  if (s.subjects.length === 0) {
    el.innerHTML = `<div class="card"><p class="hint">${t('noData')}</p></div>`
    return
  }
  
  // Calculate overall average
  const averages = s.subjects
    .map(sub => averageForSubject(sub, s.grading))
    .filter(avg => avg !== null)
  
  const overallAvg = averages.length > 0
    ? averages.reduce((sum, avg) => sum + avg, 0) / averages.length
    : null
  
  // Overall card
  if (overallAvg !== null) {
    const overallCard = document.createElement('div')
    overallCard.className = 'card'
    overallCard.style.gridColumn = '1 / -1'
    overallCard.innerHTML = `
      <h3 style="margin:0 0 1rem 0">Gesamtdurchschnitt</h3>
      <div style="font-size:3rem;font-weight:700;text-align:center;background:linear-gradient(135deg, var(--primary), var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        ${formatGradeWithLabel(overallAvg, s.grading)}
      </div>
    `
    el.appendChild(overallCard)
  }
  
  // Subject cards
  s.subjects.forEach(sub => {
    const avg = averageForSubject(sub, s.grading)
    const card = document.createElement('div')
    card.className = 'card'
    
    const gradeColor = avg !== null
      ? avg <= 2 ? 'var(--accent)'
      : avg <= 3 ? 'var(--primary)'
      : avg <= 4 ? 'var(--warning)'
      : 'var(--danger)'
      : 'var(--text-muted)'
    
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <span class="dot" style="background:${sub.color}"></span>
        <strong style="font-size:1.1rem">${sub.name}</strong>
      </div>
      <div style="font-size:2rem;font-weight:700;color:${gradeColor};text-align:center;margin:1rem 0">
        ${formatGradeWithLabel(avg, s.grading)}
      </div>
      <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
        <span class="badge">${sub.written.length} ${t('written')}</span>
        <span class="badge">${sub.oral.length} ${t('oral')}</span>
      </div>
    `
    el.appendChild(card)
  })
}

export function renderTrends(s) {
  const canvas = document.getElementById('trends-canvas')
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  
  ctx.clearRect(0, 0, width, height)
  
  if (s.subjects.length === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '16px -apple-system'
    ctx.textAlign = 'center'
    ctx.fillText(t('noData'), width / 2, height / 2)
    return
  }
  
  // Draw grid
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 1
  
  for (let i = 1; i <= 6; i++) {
    const y = (i / 6) * (height - 60) + 30
    ctx.beginPath()
    ctx.moveTo(40, y)
    ctx.lineTo(width - 20, y)
    ctx.stroke()
    
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '12px -apple-system'
    ctx.textAlign = 'right'
    ctx.fillText(i.toString(), 35, y + 4)
  }
  
  // Draw trends for each subject
  s.subjects.forEach((sub, idx) => {
    const allGrades = [
      ...sub.written.map(g => ({ ...g, category: 'written' })),
      ...sub.oral.map(g => ({ ...g, category: 'oral' }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date))
    
    if (allGrades.length < 2) return
    
    const converter = s.grading === 'classic' ? classicToNumber : pointsToNumber
    const points = allGrades.map(g => converter(g.value)).filter(v => v !== null)
    
    if (points.length < 2) return
    
    ctx.strokeStyle = sub.color
    ctx.lineWidth = 3
    ctx.beginPath()
    
    points.forEach((point, i) => {
      const x = 40 + (i / (points.length - 1)) * (width - 60)
      const y = ((point - 1) / 5) * (height - 60) + 30
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.stroke()
    
    // Draw dots
    ctx.fillStyle = sub.color
    points.forEach((point, i) => {
      const x = 40 + (i / (points.length - 1)) * (width - 60)
      const y = ((point - 1) / 5) * (height - 60) + 30
      
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
    })
    
    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '14px -apple-system'
    ctx.textAlign = 'left'
    ctx.fillText(sub.name, 10, height - 20 + idx * 18)
    
    ctx.fillStyle = sub.color
    ctx.fillRect(width - 80, height - 26 + idx * 18, 60, 3)
  })
}

export function renderGoals(s) {
  const el = document.getElementById('goals')
  if (!el) return
  
  el.innerHTML = ''
  
  const toolbar = document.createElement('div')
  toolbar.className = 'toolbar'
  toolbar.innerHTML = `
    <h2 style="margin:0">${t('goals')}</h2>
    <button class="btn-primary" id="add-goal-btn">${t('addGoal')}</button>
  `
  el.appendChild(toolbar)
  
  const goalsContainer = document.createElement('div')
  goalsContainer.style.marginTop = '1.5rem'
  
  if (s.goals.length === 0) {
    goalsContainer.innerHTML = `<div class="card"><p class="hint">${t('noData')}</p></div>`
  } else {
    s.goals.forEach(goal => {
      const subject = s.subjects.find(sub => sub.id === goal.subjectId)
      const currentAvg = subject ? averageForSubject(subject, s.grading) : null
      
      const progress = currentAvg !== null && goal.targetGrade !== null
        ? Math.max(0, Math.min(100, ((6 - currentAvg) / (6 - goal.targetGrade)) * 100))
        : 0
      
      const isAchieved = currentAvg !== null && currentAvg <= goal.targetGrade
      const isPastDeadline = new Date(goal.deadline) < new Date()
      
      const goalCard = document.createElement('div')
      goalCard.className = `goal-card ${isAchieved ? 'achieved' : ''}`
      goalCard.innerHTML = `
        <div class="goal-header">
          <div>
            <div class="goal-title">${goal.description || 'Ziel'}</div>
            <div class="goal-subject">${subject?.name || 'Unbekanntes Fach'}</div>
          </div>
          <div style="display:flex;gap:0.5rem">
            <button class="btn-icon" data-act="toggle" data-id="${goal.id}" title="${isAchieved ? 'Als nicht erreicht markieren' : 'Als erreicht markieren'}">
              ${isAchieved ? '✓' : '○'}
            </button>
            <button class="btn-icon" data-act="delete" data-id="${goal.id}" title="${t('delete')}">🗑</button>
          </div>
        </div>
        
        <div style="display:flex;gap:1rem;margin-top:0.5rem;flex-wrap:wrap">
          <span class="badge badge-primary">Ziel: ${formatGradeWithLabel(goal.targetGrade, s.grading)}</span>
          <span class="badge ${isAchieved ? 'badge-success' : ''}">Aktuell: ${formatGradeWithLabel(currentAvg, s.grading)}</span>
          <span class="badge ${isPastDeadline ? 'badge-danger' : ''}">Frist: ${goal.deadline}</span>
        </div>
        
        <div class="goal-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width:${progress}%"></div>
          </div>
          <div class="progress-text">
            <span>${t('progress')}</span>
            <span>${progress.toFixed(0)}%</span>
          </div>
        </div>
      `
      
      goalCard.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-act]')
        if (!btn) return
        
        const goalId = parseInt(btn.dataset.id)
        const act = btn.dataset.act
        
        if (act === 'delete') {
          showConfirmDialog(t('deleteConfirm'), () => {
            deleteGoal(goalId)
            renderGoals(state)
            showToast('Ziel gelöscht', 'success')
          })
        } else if (act === 'toggle') {
          updateGoal(goalId, { achieved: !isAchieved })
          renderGoals(state)
          showToast(isAchieved ? 'Als nicht erreicht markiert' : 'Glückwunsch! Ziel erreicht! 🎉', 'success')
        }
      })
      
      goalsContainer.appendChild(goalCard)
    })
  }
  
  el.appendChild(goalsContainer)
  
  // Add goal button handler
  const addBtn = document.getElementById('add-goal-btn')
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      showFormModal(
        t('addGoal'),
        [
          {
            name: 'subjectId',
            label: 'Fach',
            type: 'select',
            required: true,
            options: s.subjects.map(sub => ({ value: sub.id, label: sub.name }))
          },
          {
            name: 'targetGrade',
            label: t('targetGrade'),
            type: 'text',
            placeholder: s.grading === 'classic' ? '1.0 - 6.0' : '0 - 15',
            required: true
          },
          {
            name: 'deadline',
            label: t('deadline'),
            type: 'date',
            required: true
          },
          {
            name: 'description',
            label: t('description'),
            type: 'textarea',
            placeholder: 'z.B. "Verbesserung auf 2.0 bis Halbjahr"'
          }
        ],
        (data) => {
          if (!data.subjectId || !data.targetGrade || !data.deadline) {
            showToast(t('fillAllFields'), 'error')
            return false
          }
          
          // Konvertiere die Ziel-Note ins interne Format (1.0-6.0)
          let targetGradeNumeric
          if (s.grading === 'points') {
            // Punktesystem: Eingabe ist 0-15, konvertiere zu 1.0-6.0
            const points = parseFloat(data.targetGrade)
            targetGradeNumeric = pointsToNumber(points)
          } else {
            // Klassisches System: Eingabe ist bereits 1.0-6.0
            targetGradeNumeric = parseFloat(data.targetGrade)
          }
          
          if (targetGradeNumeric === null || isNaN(targetGradeNumeric)) {
            showToast(t('invalidGrade'), 'error')
            return false
          }
          
          addGoal({
            subjectId: parseInt(data.subjectId),
            targetGrade: targetGradeNumeric,
            deadline: data.deadline,
            description: data.description
          })
          
          renderGoals(state)
          showToast('Ziel hinzugefügt', 'success')
        }
      )
    })
  }
}

// Settings
const settings = document.querySelector('#view-einstellungen')
settings?.addEventListener('change', (e) => {
  const r = e.target.closest('input[name="grading"]')
  if (!r) return
  setGrading(r.value)
  renderSubjects(state)
  renderOverview(state)
  renderTrends(state)
  showToast('Notensystem geändert', 'info')
})
