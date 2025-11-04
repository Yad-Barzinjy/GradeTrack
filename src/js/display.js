// Hilfsfunktionen für die Anzeige von Noten im korrekten Format

/**
 * Konvertiert einen numerischen Durchschnitt (1.0-6.0) zurück ins gewählte Notensystem
 */
export function formatGradeDisplay(numericValue, gradingMode) {
  if (numericValue === null || numericValue === undefined) return '-'
  
  if (gradingMode === 'points') {
    // Zurück ins Punktesystem (0-15)
    // 1.0 = 15 Punkte, 6.0 = 0 Punkte
    const points = Math.round((6 - numericValue) * 3)
    return Math.max(0, Math.min(15, points)).toString()
  } else {
    // Klassisches System (1.0-6.0)
    return numericValue.toFixed(2)
  }
}

/**
 * Gibt die Beschriftung für das Notensystem zurück
 */
export function getGradeLabel(gradingMode) {
  return gradingMode === 'points' ? 'Punkte' : 'Note'
}

/**
 * Gibt den Notenbereich zurück
 */
export function getGradeRange(gradingMode) {
  return gradingMode === 'points' ? '0-15' : '1-6'
}

/**
 * Formatiert die Anzeige mit Label
 */
export function formatGradeWithLabel(numericValue, gradingMode) {
  const value = formatGradeDisplay(numericValue, gradingMode)
  const label = gradingMode === 'points' ? ' Pkt.' : ''
  return value + label
}
