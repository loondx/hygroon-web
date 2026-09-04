import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { shouldHideStickyCta, computeStickyCtaVisible } from './stickyCta.ts';

describe('shouldHideStickyCta', () => {
  it('hides on the analyze wizard', () => {
    assert.equal(shouldHideStickyCta('/analyze'), true);
  });

  it('hides on a gated diagnostic report', () => {
    assert.equal(shouldHideStickyCta('/reports/abc123'), true);
  });

  it('hides on proposal acceptance', () => {
    assert.equal(shouldHideStickyCta('/proposals/abc123'), true);
  });

  it('hides on onboarding', () => {
    assert.equal(shouldHideStickyCta('/onboarding/abc123'), true);
  });

  it('does not hide on the homepage', () => {
    assert.equal(shouldHideStickyCta('/'), false);
  });

  it('does not hide on other public pages', () => {
    assert.equal(shouldHideStickyCta('/industries'), false);
    assert.equal(shouldHideStickyCta('/industries/hvac'), false);
  });

  it('handles a missing pathname safely', () => {
    assert.equal(shouldHideStickyCta(null), false);
    assert.equal(shouldHideStickyCta(undefined), false);
  });
});

describe('computeStickyCtaVisible', () => {
  const tall = { viewportHeight: 800, documentHeight: 6000 };

  it('stays hidden before the hero has scrolled out of view', () => {
    assert.equal(computeStickyCtaVisible({ scrollY: 100, ...tall }), false);
  });

  it('becomes visible once scrolled past the hero, mid-page', () => {
    assert.equal(computeStickyCtaVisible({ scrollY: 1000, ...tall }), true);
  });

  it('hides again once close enough to the bottom to reach the footer', () => {
    // documentHeight 6000, viewport 800 -> bottom of viewport at scrollY 5200 is page end
    assert.equal(computeStickyCtaVisible({ scrollY: 5000, ...tall }), false);
  });

  it('is visible in the gap between "past hero" and "near footer" on a long page', () => {
    assert.equal(computeStickyCtaVisible({ scrollY: 2500, ...tall }), true);
  });

  it('never appears on a short page where hero and footer clearance overlap', () => {
    // documentHeight 1200 means even scrollY 0 is within footer clearance of the (short) bottom
    assert.equal(computeStickyCtaVisible({ scrollY: 500, viewportHeight: 800, documentHeight: 1200 }), false);
  });
});
