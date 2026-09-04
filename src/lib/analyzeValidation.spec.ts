import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isPlausibleWebsite } from './analyzeValidation.ts';

describe('isPlausibleWebsite', () => {
  it('accepts a bare domain with no protocol', () => {
    assert.equal(isPlausibleWebsite('example.com'), true);
  });

  it('accepts http and https, with or without www', () => {
    assert.equal(isPlausibleWebsite('https://example.com'), true);
    assert.equal(isPlausibleWebsite('http://example.com'), true);
    assert.equal(isPlausibleWebsite('https://www.example.com'), true);
  });

  it('accepts a trailing slash and surrounding whitespace', () => {
    assert.equal(isPlausibleWebsite('  https://example.com/  '), true);
  });

  it('accepts a multi-part TLD', () => {
    assert.equal(isPlausibleWebsite('example.co.uk'), true);
  });

  it('rejects empty input', () => {
    assert.equal(isPlausibleWebsite(''), false);
    assert.equal(isPlausibleWebsite('   '), false);
  });

  it('rejects text with no dot at all', () => {
    assert.equal(isPlausibleWebsite('mybusiness'), false);
  });

  it('rejects a bare IP address', () => {
    assert.equal(isPlausibleWebsite('192.168.1.1'), false);
    assert.equal(isPlausibleWebsite('http://8.8.8.8'), false);
  });

  it('rejects a string with no real TLD shape', () => {
    assert.equal(isPlausibleWebsite('my.business.'), false);
  });

  it('rejects unparseable garbage', () => {
    assert.equal(isPlausibleWebsite('not a url at all!!'), false);
  });
});
