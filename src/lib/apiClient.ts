const LOCAL_API_BASE = 'http://localhost:8080';
const RENDER_API_BASE = 'https://backend-9c02.onrender.com';

function normalizeBase(url: string): string {
  return url.replace(/\/+$/, '');
}

function resolvePrimaryBase(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configured) return normalizeBase(configured);
  return import.meta.env.DEV ? LOCAL_API_BASE : RENDER_API_BASE;
}

function resolveFallbackBase(primaryBase: string): string {
  return primaryBase.includes('localhost') ? RENDER_API_BASE : LOCAL_API_BASE;
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const primaryBase = resolvePrimaryBase();
  const fallbackBase = resolveFallbackBase(primaryBase);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const isDev = import.meta.env.DEV;

  const primaryUrl = `${primaryBase}${normalizedPath}`;
  const fallbackUrl = `${fallbackBase}${normalizedPath}`;

  try {
    const primaryResponse = await fetch(primaryUrl, init);
    const shouldUsePrimary =
      primaryBase === fallbackBase ||
      primaryResponse.ok ||
      (!isDev && primaryResponse.status < 500);

    if (shouldUsePrimary) {
      return primaryResponse;
    }
  } catch {
    // Network / CORS / connection error on primary. Try fallback.
  }

  return fetch(fallbackUrl, init);
}
