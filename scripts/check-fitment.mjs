// node --experimental-strip-types scripts/check-fitment.mjs
import assert from 'node:assert/strict';
import { fitmentVerdict as v } from '../src/lib/fitment.ts';

const golf = [{ make: 'Volkswagen', model: 'Golf', from: 2004, to: 2012 }];
const car = (make, model, year) => ({ make, model, year });

assert.equal(v(car('Volkswagen', 'Golf', 2008), golf, {}), 'fits');
assert.equal(v(car('volkswagen', 'Golf VI', 2010), golf, {}), 'fits');
assert.equal(v(car('Volkswagen', 'Golf', 2016), golf, {}), 'no', 'outside the years');
assert.equal(v(car('Volkswagen', 'Polo', 2008), golf, {}), 'no', 'other model of a listed make');
assert.equal(v(car('Toyota', 'Yaris', 2008), golf, {}), 'unknown', 'make not listed');
assert.equal(v(car('Toyota', 'Yaris', 2008), [], {}), 'unknown', 'no data is never a yes');
assert.equal(v(car('Kia', 'Rio', 2015), [{ make: 'Kia', model: 'Rio', from: 0, to: 9999 }], {}), 'fits', 'no years stated');
assert.equal(
  v(car('Ford', 'Focus', 2010), [], { blade: 'HU101' }, { chips: [], blades: ['FO21'], frequencies: [] }),
  'no',
  'contradicting blade'
);
assert.equal(v(car('Renault', 'Trafic', 2020), [{ make: 'Renault', model: 'Trafic', from: 2015, to: null }], {}), 'fits', 'open-ended range');
assert.equal(v(car('Dacia', 'Duster', 2020), [{ make: 'Dacia', model: 'Duster', from: null, to: 2012 }], {}), 'no', 'only an end year');
assert.equal(v(car('Mazda', 'CX-3', 2018), [{ make: 'Mazda', model: '3', from: 0, to: 9999 }], {}), 'no', 'Mazda 3 is not a CX-3');
assert.equal(v(car('SKODA', 'OCTAVIA', 2010), [{ make: 'Škoda', model: 'Octavia', from: 2004, to: 2013 }], {}), 'fits', 'RDW spelling');
console.log('fitment ok');
