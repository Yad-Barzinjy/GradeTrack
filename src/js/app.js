import { state, initState, addSubject } from './state.js'
import { renderSubjects, renderOverview, renderTrends, renderGoals, switchView } from './ui.js'
import { exportJSON, exportCSV, exportPDF, exportImage, importData } from './export.js'
import { showFormModal, showToast } from './modal.js'
import { setLanguage as setI18nLanguage, t } from './i18n.js'
import { createBackup, listBackups, restoreBackup } from './storage.js'

// Initialize app
;(async () => {
  try {
    await initState()
    
    // Set language from state
    if (state.language) {
      setI18nLanguage(state.language)
    }
    
    // Initial render
    renderSubjects(state)
    renderOverview(state)
    renderTrends(state)
    renderGoals(state)
    
    showToast('App geladen', 'success', 1500)
  } catch (err) {
    console.error('Initialization error:', err)
    showToast('Fehler beim Laden der App', 'error')
  }
})()

// Tab navigation
const tabs = document.querySelectorAll('.tab')
const views = document.querySelectorAll('.view')

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    views.forEach(v => v.classList.remove('active'))
    switchView(btn.dataset.view)
  })
})

// Add subject button
const addBtn = document.getElementById('add-subject')
if (addBtn) {
  addBtn.addEventListener('click', () => {
    showFormModal(
      t('addSubject'),
      [
        { name: 'name', label: t('subjectName'), type: 'text', placeholder: 'z.B. Mathematik', required: true },
        { name: 'color', label: t('color'), type: 'color', value: '#007AFF' },
        { name: 'written', label: 'Gewichtung Schriftlich (%)', type: 'number', value: '60', required: true },
        { name: 'oral', label: 'Gewichtung Mündlich (%)', type: 'number', value: '40', required: true }
      ],
      (data) => {
        if (!data.name) {
          showToast(t('fillAllFields'), 'error')
          return false
        }
        
        addSubject({
          name: data.name,
          color: data.color || '#007AFF',
          weight: {
            written: parseInt(data.written) || 60,
            oral: parseInt(data.oral) || 40
          }
        })
        
        renderSubjects(state)
        renderOverview(state)
        showToast('Fach hinzugefügt', 'success')
      }
    )
  })
}

// Export buttons
const exportSection = document.getElementById('view-export')
if (exportSection) {
  exportSection.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]')
    if (!btn) return
    
    const action = btn.dataset.action
    
    try {
      if (action === 'json') {
        exportJSON(state)
        showToast('JSON exportiert', 'success')
      } else if (action === 'csv') {
        exportCSV(state)
        showToast('CSV exportiert', 'success')
      } else if (action === 'pdf') {
        exportPDF(state)
        showToast('PDF exportiert', 'success')
      } else if (action === 'image') {
        exportImage(state)
        showToast('Bild exportiert', 'success')
      } else if (action === 'import') {
        importData(state)
      } else if (action === 'backup') {
        const backupId = await createBackup()
        showToast('Backup erstellt: ' + backupId, 'success')
      } else if (action === 'restore') {
        const backups = await listBackups()
        if (backups.length === 0) {
          showToast('Keine Backups vorhanden', 'info')
        } else {
          // Show list of backups
          showToast('Backup-Wiederherstellung in Entwicklung', 'info')
        }
      }
    } catch (err) {
      console.error('Export/Import error:', err)
      showToast('Fehler: ' + err.message, 'error')
    }
  })
}
