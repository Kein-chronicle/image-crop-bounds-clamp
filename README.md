# image-crop-bounds-clamp

**Crop-box math for editors: validate bounds, clamp drag movement inside the page, and budget the output pixel size before rendering.**

[![test](https://github.com/Kein-chronicle/image-crop-bounds-clamp/actions/workflows/test.yml/badge.svg)](https://github.com/Kein-chronicle/image-crop-bounds-clamp/actions/workflows/test.yml) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Why

The bugs in a crop tool are boundary bugs: a box dragged off the page, or an export that asks for a 20,000 x 20,000 bitmap. These functions validate and clamp in points and refuse absurd raster sizes.

## Install

**As a Claude Code skill** (Claude uses it when the task matches the skill description):

```sh
git clone https://github.com/Kein-chronicle/image-crop-bounds-clamp.git ~/.claude/skills/bounded-image-crop
```

For a single project, clone into `<project>/.claude/skills/bounded-image-crop` instead, then start a new Claude Code session.

**As a library** (Node.js 22+, no dependencies):

```sh
npm install github:Kein-chronicle/image-crop-bounds-clamp
```

or copy the one file you need: `scripts/crop.mjs` is self-contained.

**Requires:** Node.js 22+.

## Quick start

Run the quickstart:

```console
$ node examples/quickstart.mjs
valid        {"x":100,"y":100,"width":200,"height":150}
drag far     {"x":412,"y":0,"width":200,"height":150} (clamped inside the page)
at 300 dpi   {"width":833,"height":625}
reject       crop off page -> crop outside bounds
reject       absurd output -> pixel budget exceeded
```

The output above is real: it is produced by the files in `examples/`.

## API

```js
import { validateCrop, moveCrop, cropPixels } from 'image-crop-bounds-clamp';

const page = { x: 0, y: 0, width: 612, height: 792 };       // points, 72 per inch
const crop = { x: 100, y: 100, width: 200, height: 150 };
validateCrop(crop, page);                                    // returns a copy, or throws RangeError
moveCrop(crop, { x: 9999, y: -9999 }, page);                 // clamped inside the page
cropPixels(crop, 300, { maxDimension: 16384, maxPixels: 1e8 }); // { width: 833, height: 625 } or throws
```

## Limits

- Points in one unrotated coordinate system. No decoding, resampling or rotated-world transforms: apply those first and budget decoding separately.

## Related projects

These solve neighbouring problems; use them when they fit better.

- **Cropper.js**: a full crop UI; this is only the validation math

## More from the same collection

Small, tested tools that grew out of running AI agents and game/app pipelines for months:

- [**pdf-page-range-parser**](https://github.com/Kein-chronicle/pdf-page-range-parser): Parse "1-3, 5, 8-" page selections into exact ranges without silently sorting or deduplicating, and reject anything ambiguous.
- [**pdf-annotation-rotation**](https://github.com/Kein-chronicle/pdf-annotation-rotation): Rotate PDF/canvas annotations (boxes, lines, ink, source masks) a quarter turn in display coordinates, without mutating the input.
- [**pdf-text-position-table-extract**](https://github.com/Kein-chronicle/pdf-text-position-table-extract): Rebuild a rectangular table from positioned text fragments (x, baseline, size, text), keeping empty cells in place.

## Development

```sh
node --test tests/run.mjs
```

The tests include inputs that are supposed to be rejected, so a green run also shows the checks can fail. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

If this saved you a debugging session, a star helps other people find it. Bug reports and failing test cases are even better.

<sub>Keywords: image-crop, geometry, javascript, esm, pdf, canvas, validation, zero-dependencies</sub>
