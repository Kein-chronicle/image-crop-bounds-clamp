import { validateCrop, moveCrop, cropPixels } from '../scripts/crop.mjs';

const page = { x: 0, y: 0, width: 612, height: 792 };      // US Letter in points
const crop = { x: 100, y: 100, width: 200, height: 150 };

console.log('valid       ', JSON.stringify(validateCrop(crop, page)));
console.log('drag far    ', JSON.stringify(moveCrop(crop, { x: 9999, y: -9999 }, page)), '(clamped inside the page)');
console.log('at 300 dpi  ', JSON.stringify(cropPixels(crop, 300)));
for (const [label, fn] of Object.entries({
  'crop off page': () => validateCrop({ x: 500, y: 0, width: 200, height: 10 }, page),
  'absurd output': () => cropPixels({ x: 0, y: 0, width: 20000, height: 20000 }, 600),
})) { try { fn(); } catch (e) { console.log('reject      ', label, '->', e.message); } }
