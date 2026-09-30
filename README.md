# HomeChart

A Snellen-style letter chart at true physical size for any screen and test distance.

- 20/20 letter = 5 arcminutes tall (stroke 1 arcminute); 20/N letter = 5 x N/20 arcminutes
- Height = 2 x distance x tan(angle / 2), e.g. 8.73 mm at 6 m, 4.36 mm at 3 m
- Screen scale from a bank card: width 85.60 mm (ISO 7810 ID-1)
- Acuity shown as Snellen, decimal (20/N) and logMAR = log10(N/20)
- Reading size: 3x threshold height (rule of thumb)

Static client-side. `node test-engine.js` runs the tests. Letters use a sans font, not licensed Sloan optotypes. Screening for curiosity only, not medical advice.
