// Umrechnung in numerische Skala 1.0 (beste) bis 6.0 (schlechteste) bzw. 0-15 Punkte -> 1.0-6.0 vergleichbar
export function classicToNumber(g) {
  // Akzeptiert z. B. '1', '1+', '2-', '3+'
  const base = parseInt(String(g), 10);
  if (isNaN(base)) return null;
  let adj = 0;
  if (String(g).includes('+')) adj = -0.3; // besser
  if (String(g).includes('-')) adj = +0.3; // schlechter
  return Math.min(6, Math.max(1, base + adj));
}

export function pointsToNumber(p) {
  // Exakte Umrechnung Oberstufenpunkte (0-15) -> klassisches System (1.0-6.0)
  // 15=1+, 14=1, 13=1-, 12=2+, 11=2, 10=2-, 9=3+, 8=3, 7=3-, 6=4+, 5=4, 4=4-, <4=nicht bestanden
  const v = Number(p);
  if (isNaN(v)) return null;
  
  const mapping = {
    15: 0.7,  // 1+
    14: 1.0,  // 1
    13: 1.3,  // 1-
    12: 1.7,  // 2+
    11: 2.0,  // 2
    10: 2.3,  // 2-
    9: 2.7,   // 3+
    8: 3.0,   // 3
    7: 3.3,   // 3-
    6: 3.7,   // 4+
    5: 4.0,   // 4
    4: 4.3,   // 4-
    3: 4.7,   // 5+
    2: 5.0,   // 5
    1: 5.3,   // 5-
    0: 6.0    // 6
  };
  
  return mapping[v] ?? 6.0; // Werte < 0 oder > 15 -> 6.0
}

// Konvertiert numerische Note (1.0-6.0) zurück zu Punkten (0-15)
export function numberToPoints(num) {
  if (num == null || isNaN(num)) return null;
  
  // Reverse mapping
  if (num <= 0.7) return 15;
  if (num <= 1.0) return 14;
  if (num <= 1.3) return 13;
  if (num <= 1.7) return 12;
  if (num <= 2.0) return 11;
  if (num <= 2.3) return 10;
  if (num <= 2.7) return 9;
  if (num <= 3.0) return 8;
  if (num <= 3.3) return 7;
  if (num <= 3.7) return 6;
  if (num <= 4.0) return 5;
  if (num <= 4.3) return 4;
  if (num <= 4.7) return 3;
  if (num <= 5.0) return 2;
  if (num <= 5.3) return 1;
  return 0;
}

// Konvertiert numerische Note (1.0-6.0) zu klassischer Note mit +/-
export function numberToClassic(num) {
  if (num == null || isNaN(num)) return null;
  
  if (num <= 0.85) return '1+';
  if (num <= 1.15) return '1';
  if (num <= 1.5) return '1-';
  if (num <= 1.85) return '2+';
  if (num <= 2.15) return '2';
  if (num <= 2.5) return '2-';
  if (num <= 2.85) return '3+';
  if (num <= 3.15) return '3';
  if (num <= 3.5) return '3-';
  if (num <= 3.85) return '4+';
  if (num <= 4.15) return '4';
  if (num <= 4.5) return '4-';
  if (num <= 4.85) return '5+';
  if (num <= 5.15) return '5';
  if (num <= 5.5) return '5-';
  return '6';
}

// Rundet Note für Zeugnis (ohne +/-)
export function roundForZeugnis(num) {
  if (num == null || isNaN(num)) return null;
  return Math.round(num);
}

export function averageForSubject(subject, gradingMode) {
  const conv = gradingMode === 'classic' ? classicToNumber : pointsToNumber;
  const w = subject.weight?.written ?? 60;
  const m = subject.weight?.oral ?? 40;
  const wVals = subject.written.map(x => conv(x.value)).filter(x => x!=null);
  const mVals = subject.oral.map(x => conv(x.value)).filter(x => x!=null);
  const wAvg = wVals.length ? wVals.reduce((a,b)=>a+b,0)/wVals.length : null;
  const mAvg = mVals.length ? mVals.reduce((a,b)=>a+b,0)/mVals.length : null;
  if (wAvg==null && mAvg==null) return null;
  if (wAvg==null) return mAvg;
  if (mAvg==null) return wAvg;
  return (wAvg*w + mAvg*m) / (w+m);
}
