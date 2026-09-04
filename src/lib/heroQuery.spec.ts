import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseBusinessQuery } from './heroQuery.ts';

describe('parseBusinessQuery', () => {
  it('treats a plain business name as a name only', () => {
    assert.deepEqual(parseBusinessQuery('Gulf Comfort HVAC Services'), { name: 'Gulf Comfort HVAC Services' });
  });

  it('extracts a bare domain as both name and domain', () => {
    assert.deepEqual(parseBusinessQuery('gulfcomforthvac.example.com'), {
      name: 'gulfcomforthvac.example.com',
      domain: 'gulfcomforthvac.example.com',
    });
  });

  it('strips protocol and www from a full URL, keeping only the host', () => {
    assert.deepEqual(parseBusinessQuery('https://www.gulfcomforthvac.example.com/contact'), {
      name: 'gulfcomforthvac.example.com',
      domain: 'gulfcomforthvac.example.com',
    });
  });

  it('does not treat a name containing a period-like word as a domain when it has spaces', () => {
    assert.deepEqual(parseBusinessQuery('A.C. Repair Co'), { name: 'A.C. Repair Co' });
  });

  it('trims surrounding whitespace', () => {
    assert.deepEqual(parseBusinessQuery('  Gulf Comfort HVAC  '), { name: 'Gulf Comfort HVAC' });
  });

  it('returns an empty name for blank input', () => {
    assert.deepEqual(parseBusinessQuery('   '), { name: '' });
  });
});
