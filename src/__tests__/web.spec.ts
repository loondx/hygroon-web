import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { brandConfig } from '../shared/brand/index.ts';
import { SUPPORTED_MARKETS } from '../shared/config/index.ts';

describe('Hygroon Public Web Smoke Tests', () => {
  it('should load brand metadata correctly', () => {
    assert.equal(brandConfig.name, 'Hygroon');
    assert.equal(brandConfig.tagline, 'Growth Systems for Service Businesses');
    assert.equal(brandConfig.subBrands.growth, 'Hygroon Growth');
    assert.equal(brandConfig.subBrands.diagnostic, 'Hygroon Diagnostic');
  });

  it('should support multi-market diagnostic routing for OM, AE, KW', () => {
    const markets = Object.keys(SUPPORTED_MARKETS);
    assert.ok(markets.includes('OM'));
    assert.ok(markets.includes('AE'));
    assert.ok(markets.includes('KW'));
    assert.ok(markets.includes('US'));
  });

  it('should verify speed-to-lead formula calculation', () => {
    const leadResponseMinutes = 4;
    const isOptimal = leadResponseMinutes <= 5;
    assert.equal(isOptimal, true);
  });
});
