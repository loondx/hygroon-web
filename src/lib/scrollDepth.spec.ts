import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeScrollDepthPercent, newlyCrossedMilestones } from './scrollDepth.ts';

describe('computeScrollDepthPercent', () => {
  test('0% at the very top of a long page', () => {
    const percent = computeScrollDepthPercent({ scrollY: 0, viewportHeight: 800, documentHeight: 4000 });
    assert.equal(percent, 20);
  });

  test('100% once scrolled to the bottom', () => {
    const percent = computeScrollDepthPercent({ scrollY: 3200, viewportHeight: 800, documentHeight: 4000 });
    assert.equal(percent, 100);
  });

  test('a page shorter than the viewport is fully scrolled', () => {
    const percent = computeScrollDepthPercent({ scrollY: 0, viewportHeight: 1000, documentHeight: 600 });
    assert.equal(percent, 100);
  });

  test('never exceeds 100 even past the bottom (overscroll)', () => {
    const percent = computeScrollDepthPercent({ scrollY: 5000, viewportHeight: 800, documentHeight: 4000 });
    assert.equal(percent, 100);
  });
});

describe('newlyCrossedMilestones', () => {
  test('crossing 60% newly fires 25 and 50, not 75 or 90', () => {
    const fired = newlyCrossedMilestones(60, new Set());
    assert.deepEqual(fired, [25, 50]);
  });

  test('already-fired milestones are not returned again', () => {
    const fired = newlyCrossedMilestones(60, new Set([25]));
    assert.deepEqual(fired, [50]);
  });

  test('below the first milestone fires nothing', () => {
    const fired = newlyCrossedMilestones(10, new Set());
    assert.deepEqual(fired, []);
  });
});
