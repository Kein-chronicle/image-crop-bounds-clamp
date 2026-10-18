import test from 'node:test';
import assert from 'node:assert/strict';
import {validateCrop,moveCrop,cropPixels} from '../scripts/crop.mjs';
const limits={x:10,y:20,width:200,height:100},box={x:20,y:30,width:72,height:36};
test('clamped movement preserves dimensions and respects nonzero origin',()=>{
 assert.deepEqual(moveCrop(box,{x:999,y:-999},limits),{x:138,y:20,width:72,height:36});
 assert.deepEqual(cropPixels(box,144),{width:144,height:72});assert.equal(box.x,20);
});
test('invalid crops and excessive raster allocation are rejected',()=>{
 assert.throws(()=>validateCrop({...box,x:0},limits));
 assert.throws(()=>cropPixels(box,100000));assert.throws(()=>cropPixels(box,NaN));
 assert.throws(()=>cropPixels(box,144,{maxPixels:100}));
 assert.throws(()=>moveCrop(box,{x:Infinity,y:0},limits));
});

test('a null options argument is treated as defaults',()=>{ assert.deepEqual(cropPixels({x:0,y:0,width:72,height:72},72,null),{width:72,height:72}); });
