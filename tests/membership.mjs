import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateMembershipPoints, parseMembershipAmount, membershipRegistrationMessage } from '../src/lib/membership.ts';

assert.equal(calculateMembershipPoints(100_000), 1_000);
assert.equal(calculateMembershipPoints(35_000), 350);
assert.equal(calculateMembershipPoints(140_000), 1_400);
assert.equal(calculateMembershipPoints(99), 0);
assert.equal(calculateMembershipPoints(101), 1);
assert.equal(calculateMembershipPoints(0), 0);
for (const invalid of [-1, 10.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
  assert.throws(() => calculateMembershipPoints(invalid), RangeError);
}
assert.equal(parseMembershipAmount('100000'), 100_000);
assert.equal(parseMembershipAmount('100000000'), 100_000_000);
for (const invalid of ['', '0', '-100', '100.000', '1e5', '100.50', 'Rp100', '100000001', '9007199254740992']) {
  assert.equal(parseMembershipAmount(invalid), null, invalid);
}
const products = JSON.parse(readFileSync(new URL('../data/catalog.json', import.meta.url)));
const ids = new Set();
for (const product of products) {
  assert.ok(!ids.has(product.id)); ids.add(product.id);
  assert.ok(product.source);
  for (const quantity of [1, 2, 99]) {
    const total = product.price * quantity;
    assert.equal(calculateMembershipPoints(total), Math.floor(total / 100));
  }
}
const message = membershipRegistrationMessage('  Bima  ', '  Cileungsi  ');
assert.ok(message.includes('Nama panggilan: Bima\n'));
assert.ok(message.includes('Cileungsi'));
assert.ok(message.includes('1%'));
assert.ok(!membershipRegistrationMessage('', '').includes('Nama panggilan'));
assert.ok(!message.includes('saldo') && !message.includes('aktif'));
console.log(`PASS: 1% points, integer rounding, invalid inputs, ${products.length} catalog prices, quantities, and WhatsApp registration.`);
