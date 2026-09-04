import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  countByPriority,
  buildExecutiveSummary,
  topFindings,
  buildFixFirstTiers,
  formatFindingSource,
  type FindingLike,
} from './findingsSummary.ts';

function finding(overrides: Partial<FindingLike> & Pick<FindingLike, 'severity'>): FindingLike {
  return {
    id: overrides.id ?? Math.random().toString(36),
    title: overrides.title ?? 'A finding',
    businessImpact: overrides.businessImpact ?? 'Some impact',
    recommendedAction: overrides.recommendedAction ?? 'Do something',
    ...overrides,
  };
}

describe('countByPriority', () => {
  test('CRITICAL and HIGH fold into high, INFO folds into low', () => {
    const counts = countByPriority([
      finding({ severity: 'CRITICAL' }),
      finding({ severity: 'HIGH' }),
      finding({ severity: 'MEDIUM' }),
      finding({ severity: 'LOW' }),
      finding({ severity: 'INFO' }),
    ]);
    assert.deepEqual(counts, { high: 2, medium: 1, low: 2 });
  });

  test('empty findings produce all-zero counts', () => {
    assert.deepEqual(countByPriority([]), { high: 0, medium: 0, low: 0 });
  });
});

describe('buildExecutiveSummary', () => {
  test('no high-priority findings and some strengths reads as solid foundation', () => {
    const summary = buildExecutiveSummary([finding({ severity: 'LOW' })]);
    assert.match(summary, /solid foundation/);
  });

  test('exactly one high-priority finding uses singular phrasing', () => {
    const summary = buildExecutiveSummary([finding({ severity: 'HIGH' })]);
    assert.match(summary, /one place/);
  });

  test('multiple high-priority findings uses plural phrasing', () => {
    const summary = buildExecutiveSummary([finding({ severity: 'CRITICAL' }), finding({ severity: 'HIGH' })]);
    assert.match(summary, /a few places/);
  });
});

describe('topFindings', () => {
  test('orders by severity and caps at the limit', () => {
    const findings = [
      finding({ severity: 'LOW', title: 'low' }),
      finding({ severity: 'CRITICAL', title: 'critical' }),
      finding({ severity: 'MEDIUM', title: 'medium' }),
      finding({ severity: 'HIGH', title: 'high' }),
    ];
    const top = topFindings(findings, 2);
    assert.deepEqual(
      top.map((f) => f.title),
      ['critical', 'high'],
    );
  });
});

describe('buildFixFirstTiers', () => {
  test('omits empty tiers rather than padding them', () => {
    const tiers = buildFixFirstTiers([finding({ severity: 'CRITICAL' })]);
    assert.deepEqual(
      tiers.map((t) => t.label),
      ['First'],
    );
  });

  test('groups all three tiers when present', () => {
    const tiers = buildFixFirstTiers([finding({ severity: 'HIGH' }), finding({ severity: 'MEDIUM' }), finding({ severity: 'LOW' })]);
    assert.deepEqual(
      tiers.map((t) => t.label),
      ['First', 'Next', 'Then'],
    );
  });
});

describe('formatFindingSource', () => {
  test('known source values map to readable labels', () => {
    assert.equal(formatFindingSource('website-audit'), 'Website');
    assert.equal(formatFindingSource('local-audit'), 'Local Search');
  });

  test('an unrecognized source is still title-cased rather than hidden', () => {
    assert.equal(formatFindingSource('new-signal-type'), 'New Signal Type');
  });

  test('a missing source falls back to a generic label', () => {
    assert.equal(formatFindingSource(undefined), 'Audit');
  });
});
