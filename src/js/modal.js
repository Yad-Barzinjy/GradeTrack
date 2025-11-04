export function showModal(content, onClose = null) {
  const modal = document.createElement('div')
  modal.className = 'modal-overlay'
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Schließen">×</button>
      <div class="modal-body">${content}</div>
    </div>
  `
  
  const closeBtn = modal.querySelector('.modal-close')
  const modalContent = modal.querySelector('.modal-content')
  
  const close = () => {
    modal.classList.add('closing')
    setTimeout(() => {
      modal.remove()
      if (onClose) onClose()
    }, 200)
  }
  
  closeBtn.addEventListener('click', close)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close()
  })
  
  // Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      close()
      document.removeEventListener('keydown', handleEscape)
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  document.body.appendChild(modal)
  
  // Animate in
  requestAnimationFrame(() => {
    modal.classList.add('active')
  })
  
  return { modal, close }
}

export function showFormModal(title, fields, onSubmit) {
  const fieldsHTML = fields.map(field => {
    const { type = 'text', name, label, placeholder = '', value = '', required = false, options = [] } = field
    
    if (type === 'select') {
      return `
        <div class="form-field">
          <label for="${name}">${label}${required ? ' *' : ''}</label>
          <select id="${name}" name="${name}" ${required ? 'required' : ''}>
            ${options.map(opt => `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`).join('')}
          </select>
        </div>
      `
    }
    
    if (type === 'textarea') {
      return `
        <div class="form-field">
          <label for="${name}">${label}${required ? ' *' : ''}</label>
          <textarea id="${name}" name="${name}" placeholder="${placeholder}" ${required ? 'required' : ''}>${value}</textarea>
        </div>
      `
    }
    
    return `
      <div class="form-field">
        <label for="${name}">${label}${required ? ' *' : ''}</label>
        <input type="${type}" id="${name}" name="${name}" placeholder="${placeholder}" value="${value}" ${required ? 'required' : ''} />
      </div>
    `
  }).join('')
  
  const content = `
    <h2 class="modal-title">${title}</h2>
    <form class="modal-form">
      ${fieldsHTML}
      <div class="form-actions">
        <button type="button" class="btn-secondary" data-action="cancel">Abbrechen</button>
        <button type="submit" class="btn-primary">Speichern</button>
      </div>
    </form>
  `
  
  const { modal, close } = showModal(content)
  
  const form = modal.querySelector('form')
  const cancelBtn = modal.querySelector('[data-action="cancel"]')
  
  cancelBtn.addEventListener('click', close)
  
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    const result = onSubmit(data)
    if (result !== false) {
      close()
    }
  })
  
  // Focus first input
  requestAnimationFrame(() => {
    const firstInput = form.querySelector('input, select, textarea')
    if (firstInput) firstInput.focus()
  })
  
  return { modal, close }
}

export function showConfirmDialog(message, onConfirm) {
  const content = `
    <div class="confirm-dialog">
      <p>${message}</p>
      <div class="form-actions">
        <button type="button" class="btn-secondary" data-action="cancel">Abbrechen</button>
        <button type="button" class="btn-danger" data-action="confirm">Löschen</button>
      </div>
    </div>
  `
  
  const { modal, close } = showModal(content)
  
  const confirmBtn = modal.querySelector('[data-action="confirm"]')
  const cancelBtn = modal.querySelector('[data-action="cancel"]')
  
  confirmBtn.addEventListener('click', () => {
    onConfirm()
    close()
  })
  
  cancelBtn.addEventListener('click', close)
  
  return { modal, close }
}

export function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  
  document.body.appendChild(toast)
  
  requestAnimationFrame(() => {
    toast.classList.add('show')
  })
  
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, duration)
}
