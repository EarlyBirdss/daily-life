import { hasLeaf } from '../utils';

test('{a: [1, 2, 3], b: { c: 5, d: { e: [ 7, 8 ] } }, e: 2} hasLeaf 8', () => {
  expect(hasLeaf({a: 1, b: 2}, 'a')).toBe(true);
});