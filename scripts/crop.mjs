function rect(r){if(!r||!['x','y','width','height'].every(k=>Number.isFinite(r[k]))||r.width<=0||r.height<=0)throw new TypeError('positive finite rectangle required');}
export function validateCrop(box,limits) {
 rect(box);rect(limits);
 if(box.x<limits.x||box.y<limits.y||box.x+box.width>limits.x+limits.width||box.y+box.height>limits.y+limits.height)throw new RangeError('crop outside bounds');
 return {...box};
}
export function moveCrop(box,delta,limits) {
 validateCrop(box,limits);if(!delta||![delta.x,delta.y].every(Number.isFinite))throw new TypeError('finite delta required');
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 return {...box,x:clamp(box.x+delta.x,limits.x,limits.x+limits.width-box.width),y:clamp(box.y+delta.y,limits.y,limits.y+limits.height-box.height)};
}
export function cropPixels(box,ppi,opts) {
 const {maxDimension=16384,maxPixels=100000000}=opts??{};
 rect(box);if(!Number.isFinite(ppi)||ppi<=0||!Number.isSafeInteger(maxDimension)||maxDimension<1||!Number.isSafeInteger(maxPixels)||maxPixels<1)throw new RangeError('invalid pixel budget');
 const width=Math.max(1,Math.round(box.width*ppi/72)),height=Math.max(1,Math.round(box.height*ppi/72));
 if(!Number.isSafeInteger(width)||!Number.isSafeInteger(height)||width>maxDimension||height>maxDimension||width*height>maxPixels)throw new RangeError('pixel budget exceeded');
 return {width,height};
}
