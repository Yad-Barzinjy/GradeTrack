// Hilfsfunktionen für die Anzeige von Noten im korrekten Format
import { numberToPoints, numberToClassic, roundForZeugnis } from './grades.js'

/**
 * Konvertiert einen numerischen Durchschnitt (1.0-6.0) zurück ins gewählte Notensystem
 * @param {number} numericValue - Numerischer Wert (1.0-6.0)
 * @param {string} gradingMode - 'points' oder 'classic'
 * @param {boolean} isZeugnis - Wenn true, wird ohne +/- gerundet (nur bei classic)
 */
export function formatGradeDisplay(numericValue, gradingMode, isZeugnis = false) {
  if (numericValue === null || numericValue === undefined) return '-'
  
  if (gradingMode === 'points') {
    // Zurück ins Punktesystem (0-15) mit exakter Konvertierung
    const points = numberToPoints(numericValue)
    return points !== null ? points.toString() : '-'
  } else {
    // Klassisches System
    if (isZeugnis) {
      // Zeugnisnote ohne +/- (nur 1-6)
      return roundForZeugnis(numericValue)?.toString() ?? '-'
    } else {
      // Mit +/- für Einzelnoten und Durchschnitte
      return numberToClassic(numericValue) ?? '-'
    }
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
 * @param {number} numericValue - Numerischer Wert (1.0-6.0)
 * @param {string} gradingMode - 'points' oder 'classic'
 * @param {boolean} isZeugnis - Wenn true, wird ohne +/- gerundet (nur bei classic)
 */
export function formatGradeWithLabel(numericValue, gradingMode, isZeugnis = false) {
  const value = formatGradeDisplay(numericValue, gradingMode, isZeugnis)
  const label = gradingMode === 'points' ? ' Pkt.' : ''
  return value + label
}
