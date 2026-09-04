import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import robots from './robots.ts';
import sitemap from './sitemap.ts';
import { PUBLIC_INDUSTRIES } from '../config/industries.ts';

const PRIVATE_PREFIXES = ['/reports', '/proposals', '/onboarding'];
const APP_DIR = fileURLToPath(new URL('.', import.meta.url));

/** Maps a sitemap path to the page.tsx file that must exist to serve it —
 * catches a route renamed/removed on disk while the sitemap still lists it
 * (or vice versa: a real page nobody added to the sitemap). */
function pageFileFor(path: string): string {
  const segment = path === '' ? '' : path;
  return `${APP_DIR}${segment}/page.tsx`;
}

describe('robots.ts', () => {
  it('disallows every token-gated private route prefix', () => {
    const { rules } = robots();
    const disallow = Array.isArray(rules) ? rules.flatMap((r) => r.disallow ?? []) : (rules.disallow ?? []);
    const disallowList = Array.isArray(disallow) ? disallow : [disallow];
    for (const prefix of PRIVATE_PREFIXES) {
      assert.ok(
        disallowList.some((d) => d?.startsWith(prefix)),
        `expected robots disallow list to cover ${prefix}`,
      );
    }
  });

  it('points at the sitemap', () => {
    const { sitemap: sitemapUrl } = robots();
    assert.ok(typeof sitemapUrl === 'string' && sitemapUrl.endsWith('/sitemap.xml'));
  });
});

describe('sitemap.ts', () => {
  it('never lists a token-gated private route', () => {
    const entries = sitemap();
    for (const entry of entries) {
      for (const prefix of PRIVATE_PREFIXES) {
        assert.ok(!entry.url.includes(prefix), `sitemap should not include ${entry.url}`);
      }
    }
  });

  it('includes the homepage and the analyze flow', () => {
    const urls = sitemap().map((e) => e.url);
    assert.ok(urls.includes('https://hygroon.com'));
    assert.ok(urls.some((u) => u.endsWith('/analyze')));
  });

  it('lists every real industry from the public catalog', () => {
    const urls = sitemap().map((e) => e.url);
    for (const industry of PUBLIC_INDUSTRIES) {
      if (!industry.hasPage) continue;
      assert.ok(
        urls.includes(`https://hygroon.com/industries/${industry.slug}`),
        `sitemap is missing /industries/${industry.slug}`,
      );
    }
  });

  it('never invents a fabricated lastModified date', () => {
    for (const entry of sitemap()) {
      assert.equal(entry.lastModified, undefined, `${entry.url} should not have a lastModified — no real source for one exists`);
    }
  });

  it('every listed URL has a real page.tsx behind it', () => {
    for (const entry of sitemap()) {
      const path = entry.url.replace('https://hygroon.com', '');
      assert.ok(existsSync(pageFileFor(path)), `${entry.url} has no page.tsx at ${pageFileFor(path)}`);
    }
  });
});
