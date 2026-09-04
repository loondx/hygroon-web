import { brandConfig } from '../shared/brand/index.ts';

/**
 * Helper to submit updated public canonical URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 * IndexNow allows instant crawling and indexing notification.
 */
export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Submits public URLs to IndexNow API.
 * Automatically filters out any private/token-gated routes before sending.
 */
export async function submitToIndexNow(urls: string[], key: string): Promise<{ success: boolean; status: number; message: string }> {
  // Filter out any token/private URLs
  const privatePrefixes = ['/reports/', '/proposals/', '/onboarding/', '/api/'];
  const publicUrls = urls.filter((url) => {
    try {
      const parsed = new URL(url);
      return !privatePrefixes.some((prefix) => parsed.pathname.startsWith(prefix));
    } catch {
      return false;
    }
  });

  if (publicUrls.length === 0) {
    return { success: false, status: 400, message: 'No valid public URLs provided for IndexNow submission' };
  }

  const canonicalDomain = brandConfig.website.replace(/^https?:\/\//, '');

  const payload: IndexNowPayload = {
    host: canonicalDomain,
    key,
    keyLocation: `${brandConfig.website}/${key}.txt`,
    urlList: publicUrls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: res.ok || res.status === 202,
      status: res.status,
      message: res.ok ? 'IndexNow submission successful' : `IndexNow responded with status ${res.status}`,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : 'Unknown IndexNow fetch error',
    };
  }
}
