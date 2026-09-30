(function (root) {
  'use strict';
  // Snellen geometry: a 20/20 optotype is 5 arcminutes tall (stroke 1 arcminute). A 20/N letter subtends 5*N/20 arcminutes.
  var CARD_MM = 85.60; // ISO/IEC 7810 ID-1 card width
  var LINES = [200, 100, 70, 50, 40, 30, 25, 20, 15, 10];
  var FT_MM = 304.8;
  function arcmin(den) { return 5 * den / 20; }
  function letterHeightMm(distMm, den) { return 2 * distMm * Math.tan((arcmin(den) / 60) * Math.PI / 180 / 2); }
  function strokeMm(distMm, den) { return letterHeightMm(distMm, den) / 5; }
  function pxPerMm(cardPx) { return cardPx / CARD_MM; }
  function mmToPx(mm, ppm) { return mm * ppm; }
  function mmToPt(mm) { return mm / 25.4 * 72; }
  // distance (mm) at which a 20/N letter of given height (mm) is seen
  function distanceForHeight(hMm, den) { return hMm / (2 * Math.tan((arcmin(den) / 60) * Math.PI / 180 / 2)); }
  // decimal acuity and logMAR from the smallest line read (denominator N at 20 ft)
  function decimal(den) { return 20 / den; }
  function logMAR(den) { return Math.log(den / 20) / Math.LN10; }
  // comfortable reading height: multiple of threshold size, for someone with acuity 20/N
  function comfortHeightMm(distMm, den, factor) { return letterHeightMm(distMm, den) * (factor == null ? 3 : factor); }
  // seeded letter rows from the 10 standard Sloan letters
  var SLOAN = 'CDHKNORSVZ';
  function rowLetters(seed, n) {
    var s = seed * 2654435761 % 4294967296, out = '', last = '', c;
    for (var i = 0; i < n; i++) {
      do { s = (s * 1664525 + 1013904223) % 4294967296; c = SLOAN.charAt(Math.floor(s / 4294967296 * SLOAN.length)); } while (c === last);
      out += c; last = c;
    }
    return out;
  }
  function lettersForLine(den) { var n = den >= 100 ? 1 : den >= 70 ? 2 : den >= 50 ? 3 : den >= 40 ? 4 : 5; return rowLetters(den, n); }
  var api = { CARD_MM: CARD_MM, LINES: LINES, FT_MM: FT_MM, arcmin: arcmin, letterHeightMm: letterHeightMm, strokeMm: strokeMm, pxPerMm: pxPerMm, mmToPx: mmToPx, mmToPt: mmToPt,
    distanceForHeight: distanceForHeight, decimal: decimal, logMAR: logMAR, comfortHeightMm: comfortHeightMm, rowLetters: rowLetters, lettersForLine: lettersForLine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.HomeChart = api;
})(typeof window !== 'undefined' ? window : this);
