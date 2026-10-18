---
name: bounded-image-crop
description: Validate crop bounds, clamp drag movement and budget raster output dimensions. Use when implementing bounded image crop UI or raster exports.
---

# bounded-image-crop

1. Confirm the input contract below; preserve source data.
2. Import the functions in `scripts/crop.mjs`. Node.js 22+ or modern browser ES modules; no external dependencies.
3. Run `node --test tests/run.mjs` from this skill folder; test assertions are executable usage examples.
4. Show validation errors to the caller. Never translate a rejected operation into an empty successful result.
5. Apply the returned plan only through the host application's storage or rendering boundary.

## Contract and limits

Coordinates and dimensions are points (72 per inch), using one unrotated coordinate system. No image decoding, resampling or rotated-world transform is included. Caller applies transforms before validation and budgets source image decoding separately.

## Verification

Copy this complete folder to install it. Test both normal input and rejection cases with `node --test tests/run.mjs`. No private repository, API key or service is needed.
