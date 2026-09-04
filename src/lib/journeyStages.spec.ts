import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { classifyJourneyStages, type JourneyFindingLike } from './journeyStages.ts';

function finding(type: string, severity: JourneyFindingLike['severity'], title = type): JourneyFindingLike {
  return { type, severity, title, businessImpact: `${title} impact` };
}

describe('classifyJourneyStages', () => {
  test('response and booking are always Needs Confirmation, regardless of findings', () => {
    const stages = classifyJourneyStages([finding('LOCAL', 'CRITICAL'), finding('CONVERSION', 'CRITICAL')]);
    const response = stages.find((s) => s.key === 'response')!;
    const booking = stages.find((s) => s.key === 'booking')!;
    assert.equal(response.status, 'Needs Confirmation');
    assert.equal(response.measured, false);
    assert.equal(booking.status, 'Needs Confirmation');
    assert.equal(booking.measured, false);
  });

  test('discovery is Strong when no LOCAL/SEO/COMPETITIVE/CONTENT/TRUST findings exist', () => {
    const stages = classifyJourneyStages([finding('CONVERSION', 'CRITICAL')]);
    const discovery = stages.find((s) => s.key === 'discovery')!;
    assert.equal(discovery.status, 'Strong');
    assert.equal(discovery.finding, null);
  });

  test('discovery reflects the worst matching finding severity', () => {
    const stages = classifyJourneyStages([finding('SEO', 'MEDIUM'), finding('LOCAL', 'CRITICAL', 'No reviews')]);
    const discovery = stages.find((s) => s.key === 'discovery')!;
    assert.equal(discovery.status, 'Opportunity');
    assert.equal(discovery.finding?.title, 'No reviews');
  });

  test('MEDIUM severity maps to Needs Review, LOW/INFO map to Strong', () => {
    const medium = classifyJourneyStages([finding('CONVERSION', 'MEDIUM')]).find((s) => s.key === 'contact')!;
    const low = classifyJourneyStages([finding('CONVERSION', 'LOW')]).find((s) => s.key === 'contact')!;
    assert.equal(medium.status, 'Needs Review');
    assert.equal(low.status, 'Strong');
  });

  test('a finding type outside both maps (e.g. unmapped future type) affects neither stage', () => {
    const stages = classifyJourneyStages([finding('SOME_NEW_TYPE', 'CRITICAL')]);
    assert.equal(stages.find((s) => s.key === 'discovery')!.status, 'Strong');
    assert.equal(stages.find((s) => s.key === 'contact')!.status, 'Strong');
  });
});
