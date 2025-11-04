import { averageForSubject } from './grades.js'
import { importState } from './state.js'
import { renderSubjects, renderOverview, renderTrends, renderGoals } from './ui.js'
import { showToast } from './modal.js'

function download(filename, content, type='text/plain') {
  const blob = new Blob([content], { type })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

export function importData(state) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json,.csv'
  
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const text = await file.text()
    
    try {
      if (file.name.endsWith('.json')) {
        const data = JSON.parse(text)
        importState(data)
        showToast('Daten erfolgreich importiert', 'success')
      } else if (file.name.endsWith('.csv')) {
        // Basic CSV import (simplified)
        showToast('CSV Import noch nicht vollständig implementiert', 'info')
      }
      
      // Re-render everything
      renderSubjects(state)
      renderOverview(state)
      renderTrends(state)
      renderGoals(state)
    } catch (err) {
      showToast('Fehler beim Importieren: ' + err.message, 'error')
    }
  })
  
  input.click()
}

export function exportJSON(state){
  download('noten.json', JSON.stringify(state, null, 2), 'application/json');
}

export function exportCSV(state){
  let rows = [['Fach','Bereich','Wert','Typ','Datum','Gewichtung W/M','Schnitt']];
  for(const s of state.subjects){
    const avg = averageForSubject(s, state.grading);
    const wm = `${s.weight?.written ?? 60}/${s.weight?.oral ?? 40}`;
    for(const w of s.written){ rows.push([s.name,'schriftlich',w.value,'-',w.date,wm,avg ?? '']); }
    for(const o of s.oral){ rows.push([s.name,'mündlich',o.value,o.type ?? '-',o.date,wm,avg ?? '']); }
    if(!s.written.length && !s.oral.length){ rows.push([s.name,'-','-','-','-',wm,avg ?? '']); }
  }
  const csv = rows.map(r => r.map(x => typeof x === 'string' && x.includes(',') ? `"${x.replaceAll('"','""')}"` : x).join(',')).join('\n');
  download('noten.csv', csv, 'text/csv');
}

export function exportPDF(state){
  const { jsPDF } = window.jspdf || {};
  if(!jsPDF){ alert('PDF-Export nicht verfügbar.'); return; }
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40; let y = margin;
  doc.setFont('Helvetica','bold'); doc.setFontSize(16);
  doc.text('Schulnoten-Manager – Übersicht', margin, y); y += 20;
  doc.setFont('Helvetica',''); doc.setFontSize(11);

  function line(){ doc.setDrawColor(200); doc.line(margin, y, 555, y); y += 10; }

  for(const s of state.subjects){
    if (y > 770) { doc.addPage(); y = margin; }
    const wm = `${s.weight?.written ?? 60}/${s.weight?.oral ?? 40}`;
    const avg = averageForSubject(s, state.grading);
    doc.setTextColor(20); doc.setFont(undefined,'bold');
    doc.text(`${s.name} (W/M ${wm})`, margin, y); y += 16; line();
    doc.setTextColor(80); doc.setFont(undefined,'normal');

    const w = s.written.map(x=>x.value).join(', ') || '-';
    const o = s.oral.map(x=>`${x.value} (${x.type ?? 'mündlich'})`).join(', ') || '-';
    doc.text(`Schriftlich: ${w}`, margin, y); y += 14;
    doc.text(`Mündlich: ${o}`, margin, y); y += 14;

    if(avg!=null){
      const barW = 200; const barH = 10;
      const scale = (6 - Math.min(6, Math.max(1, avg))) / 5; // 1 (gut) -> 1.0
      const filled = scale * barW;
      doc.setDrawColor(160); doc.rect(margin, y, barW, barH);
      doc.setFillColor(79,140,255); doc.rect(margin, y, filled, barH, 'F');
      doc.text(`Schnitt: ${avg.toFixed(2)}`, margin + barW + 10, y + barH - 2);
      y += 20;
    } else { y += 6; }
    y += 6;
  }

  doc.save('noten.pdf');
}

export function exportImage(state){
  const width = 1000, height = 600;
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b0f14'; ctx.fillRect(0,0,width,height);
  ctx.fillStyle = '#e8eef6'; ctx.font = '20px Helvetica';
  ctx.fillText('Schulnoten-Manager – Gesamtübersicht', 24, 40);

  let y = 80;
  for(const s of state.subjects){
    if (y > height - 40) break;
    ctx.fillStyle = s.color || '#4f8cff';
    ctx.fillRect(24, y-16, 6, 16);
    ctx.fillStyle = '#e8eef6'; ctx.font = '16px Helvetica';
    ctx.fillText(s.name, 36, y);
    y += 8;

    const w = s.written.map(x=>x.value).join(', ') || '-';
    const o = s.oral.map(x=>x.value).join(', ') || '-';
    ctx.font = '12px Helvetica'; ctx.fillStyle = '#9fb2c8';
    ctx.fillText(`Schriftlich: ${w}  |  Mündlich: ${o}`, 36, y+14);
    y += 34;
  }

  canvas.toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'noten.png';
    a.click();
    URL.revokeObjectURL(a.href);
  }, 'image/png');
}
