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
  // 15 -> 1.0, 0 -> 6.0 linear
  const v = Number(p);
  if (isNaN(v)) return null;
  const t = 6 - (v / 15) * 5; // 0->6, 15->1
  return Math.min(6, Math.max(1, t));
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
