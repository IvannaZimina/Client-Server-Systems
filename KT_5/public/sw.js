// C05 Exercise 6, points 1-10: service-worker lifecycle and offline strategies.
import { shellFirst } from '../materials/shell-first.js';

export { shellFirst };
// 6.1.
const VERSION = 'piletikassa-v3';
const SHELL = ['/index.html', '/app.js', '/style.css', '/logo.svg', '/manifest.webmanifest'];

// 6.8.
export function pick(url) {
  if (url.startsWith('/api/orders')) return 'network-only';
  if (url.startsWith('/api/events')) return 'network-first';
  if (url.startsWith('/api/tickets/')) return 'stale-while-revalidate';
  return 'shell-first';
}
// 6.6.
export async function networkFirst(url, {
  cache,
  fetchFn = globalThis.fetch,
  timeout = 5000,
} = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetchFn(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await cache.put(url, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(url);
    if (cached) return cached;
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
// 6.7.
export async function staleWhileRevalidate(url, {
  cache,
  fetchFn = globalThis.fetch,
  awaitBackground = false,
} = {}) {
  const cached = await cache.match(url);
  const refresh = Promise.resolve()
    .then(() => fetchFn(url))
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return cache.put(url, response.clone()).then(() => response);
    })
    .catch((error) => { if (!cached) throw error; return null; });
  if (cached) {
    if (awaitBackground) await refresh;
    else refresh.catch(() => {});
    return cached;
  }
  return refresh;
}

if (globalThis.self?.addEventListener) {
  // 6.1.
  self.addEventListener('install', (event) => {
    // 6.3.
    event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL)));
    // 6.4.
    self.skipWaiting();
  });
  // 6.2.
  self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== VERSION).map((key) => caches.delete(key)),
    )).then(() => self.clients.claim()));
  });
}
