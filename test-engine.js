var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, tol) { n++; tol = tol == null ? 1e-9 : tol; if (!(Math.abs(a - b) <= tol)) { bad++; console.log('FAIL', m, a, b); } }
// standard: 20/20 letter = 5 arcmin. At 6 m = 8.73 mm, at 20 ft (6.096 m) = 8.87 mm; at 3 m 4.36 mm; at 10 ft 4.43 mm
eq(E.arcmin(20), 5, 'arc20'); eq(E.arcmin(40), 10, 'arc40'); eq(E.arcmin(200), 50, 'arc200'); eq(E.arcmin(10), 2.5, 'arc10');
eq(E.letterHeightMm(6000, 20), 8.7266, 'h 6m', 1e-3); eq(E.letterHeightMm(20 * E.FT_MM, 20), 8.8663, 'h 20ft', 1e-3);
eq(E.letterHeightMm(3000, 20), 4.3633, 'h 3m', 1e-3); eq(E.letterHeightMm(10 * E.FT_MM, 20), 4.4331, 'h 10ft', 1e-3);
// 20/200 at 20 ft is ~88.7 mm (the big E is about 3.5 inches)
eq(E.letterHeightMm(20 * E.FT_MM, 200) / 25.4, 3.49, 'big E inches', 0.02);
// doubling denominator doubles height (small angle) and distance doubles height
eq(E.letterHeightMm(3000, 40) / E.letterHeightMm(3000, 20), 2, 'scale den', 1e-4); eq(E.letterHeightMm(6000, 20) / E.letterHeightMm(3000, 20), 2, 'scale dist', 1e-9);
eq(E.strokeMm(6000, 20), E.letterHeightMm(6000, 20) / 5, 'stroke'); eq(E.strokeMm(6000, 20) * 1, 1.7453, 'stroke 1 arcmin at 6m', 1e-3);
// calibration
eq(E.pxPerMm(342.4), 4, 'ppm'); eq(E.mmToPx(8.7266, 4), 34.9064, 'px', 1e-3); eq(E.mmToPt(25.4), 72, 'pt');
// inverse
eq(E.distanceForHeight(E.letterHeightMm(4321, 30), 30), 4321, 'inverse', 1e-6);
// acuity conversions
eq(E.decimal(20), 1, 'dec'); eq(E.decimal(40), 0.5, 'dec40'); eq(E.logMAR(20), 0, 'logmar0'); eq(E.logMAR(40), 0.30103, 'logmar40', 1e-5); eq(E.logMAR(200), 1, 'logmar200'); eq(E.logMAR(10), -0.30103, 'logmar10', 1e-5);
// comfort
eq(E.comfortHeightMm(500, 20, 3), 3 * E.letterHeightMm(500, 20), 'comfort'); eq(E.comfortHeightMm(500, 20), 3 * E.letterHeightMm(500, 20), 'default 3');
// letters: deterministic, no immediate repeats, right counts, only Sloan letters
E.LINES.forEach(function (d) { var a = E.lettersForLine(d), b = E.lettersForLine(d); eq(a === b ? 1 : 0, 1, 'det' + d); var ok = 1; for (var i = 1; i < a.length; i++) if (a[i] === a[i - 1]) ok = 0; eq(ok, 1, 'norepeat' + d); eq(/^[CDHKNORSVZ]+$/.test(a) ? 1 : 0, 1, 'sloan' + d); });
eq(E.lettersForLine(200).length, 1, 'n200'); eq(E.lettersForLine(20).length, 5, 'n20'); eq(E.lettersForLine(40).length, 4, 'n40');
// monotone lines
for (var i = 1; i < E.LINES.length; i++) eq(E.LINES[i] < E.LINES[i - 1] ? 1 : 0, 1, 'lines desc' + i);
for (var d = 500; d < 8000; d += 500) eq(E.letterHeightMm(d + 500, 20) > E.letterHeightMm(d, 20) ? 1 : 0, 1, 'mono' + d);
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
